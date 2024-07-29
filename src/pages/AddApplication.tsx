import { ArrowLeft, Check, ChevronsUpDown, XCircle } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import axios from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useState } from "react";
import { Url } from "url";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { cn } from "../lib/utils";
// import { useToast } from "../components/ui/use-toast"

const techStackOptions = [
  "Angular",
  ".NET",
  "React.js",
  "Vue.js",
  "Node.js",
  "Java",
  "Python",
  "Ruby on Rails",
  "Django",
  "Flask",
  "Spring Boot",
  "Laravel",
  "ASP.NET",
  "Svelte",
  "Ember.js",
  "Backbone.js",
  "Express.js",
  "Koa.js",
  "Next.js",
  "Nuxt.js",
  "Gatsby.js",
  "JQuery",
  "Meteor.js",
  "Aurelia",
  "FastAPI",
];
const databaseName = ["FDUFDDB", "EDMTTX"];
const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];
interface RepoPath {
  [key: string]: Url;
}

function AddApplication() {
  // const { toast } = useToast();
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
  const [selectedDatabaseName, setSelectedDatabaseName] = useState<string[]>(
    []
  );
  const [repoPath, setRepoPath] = useState<RepoPath>({});
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [uploading, setUploading] = useState(false);
  const [open, setOpen] = useState(false);
  // const [applicationType, setApplicationType] = useState("")
  const [value, setValue] = useState("");

  const handleAddTechStack = (tech: string) => {
    if (!selectedTechStack.includes(tech)) {
      setSelectedTechStack([...selectedTechStack, tech]);
      form.setValue("techStack", [...selectedTechStack, tech]);
    }
  };

  const handleRemoveTechStack = (tech: string) => {
    const updatedTechStack = selectedTechStack.filter((t) => t !== tech);
    setSelectedTechStack(updatedTechStack);
    form.setValue("techStack", updatedTechStack);
  };
  const handleDatabases = (db: string) => {
    if (!selectedDatabaseName.includes(db)) {
      setSelectedDatabaseName([...selectedDatabaseName, db]);
      form.setValue("databases", [...selectedDatabaseName, db]);
    }
  };

  const handleRemoveDatabases = (db: string) => {
    const updatedDatabases = selectedDatabaseName.filter((t) => t !== db);
    setSelectedDatabaseName(updatedDatabases);
    form.setValue("databases", updatedDatabases);
  };

  const handleAddRepoPath = () => {
    if (newKey && newValue) {
      const updatedRepoPath = { ...repoPath, [newKey]: newValue };
      setRepoPath(updatedRepoPath);
      form.setValue("repoPath", updatedRepoPath);
      setNewKey("");
      setNewValue("");
    }
  };

  const handleRemoveRepoPath = (key: string) => {
    const updatedRepoPath = { ...repoPath };
    delete updatedRepoPath[key];
    setRepoPath(updatedRepoPath);
    form.setValue("repoPath", updatedRepoPath);
  };

  const formSchema = z.object({
    applicationName: z.string().min(2, {
      message: "Application Name must be at least 2 characters.",
    }),
    prodUrl: z.string().url({ message: "Invalid url" }),
    repoPath: z
      .record(z.string(), z.string().url({ message: "Invalid URL" }))
      .refine((data) => Object.keys(data).length > 0, {
        message: "At least one Repo path must be added.",
      }),
    // SPExcelSheet : z.string().url({message:"upload Excel sheet"}) ,
    excelLink: z.string().url().optional(),
    applicationSMEName: z.string().min(2, {
      message: "Application SME Name must be at least 2 characters.",
    }),
    sharepointLink: z.string().url({ message: "Invalid url" }),
    techStack: z
      .array(z.string())
      .nonempty({ message: "At least one tech stack must be selected." }),
    databases: z
      .array(z.string())
      .nonempty({ message: "At least one Database must be selected." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicationName: "",
      prodUrl: "",
      applicationSMEName: "",
      // applicationType:"",
      repoPath: {},
      sharepointLink: "",
      techStack: [],
      databases: [],
      excelLink: "",
    },
  });

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "appInfo");
    formData.append("cloud_name", "dl3lsipbs");
    // https://api.cloudinary.com/v1_1/your_cloud_name/upload
    // https://api.cloudinary.com/cloudinary://351261135951196:Wkp44z2eCjxA3o-oSPiV3E6E7xU@dl3lsipbs
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/appInfo/file/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      return response.data.secure_url;
    } catch (error) {
      // toast({
      //   title: "Error Uploading the excel file",
      // })
      alert("Error");
      console.error("Error uploading to Cloudinary", error);
      throw error;
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const url = await uploadToCloudinary(file);
        form.setValue("excelLink", url);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <>
      <div className="fixed w-full py-4 px-8 flex items-center gap-4 shadow-md dark:bg-gray-800 dark:text-white">
        <Link to={"/"}>
          <ArrowLeft />
        </Link>
        <div className="text-2xl cursor-pointer">Add Application details</div>
      </div>
      <p className="text-2xl font-bold px-8 py-4">Add Application</p>
      <div className="flex justify-center">
        <div className="w-full px-8 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="applicationName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Application Name</FormLabel>
                      <FormControl>
                        <Input placeholder="UFD" {...field} />
                      </FormControl>
                      {/* <FormDescription>
                        This is your public display name.
                      </FormDescription> */}
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="prodUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PROD Url</FormLabel>
                      <FormControl>
                        <Input placeholder="https://ufd.ttx.com" {...field} />
                      </FormControl>
                      <FormDescription className="text-blue-400">
                        This is your application prod url.
                      </FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="repoPath"
                  render={() => (
                    <FormItem>
                      <FormLabel>Application Repo Path</FormLabel>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Repo name"
                          value={newKey}
                          onChange={(e) => setNewKey(e.target.value)}
                        />
                        <Input
                          placeholder="url"
                          value={newValue}
                          onChange={(e) => setNewValue(e.target.value)}
                        />
                        <Button
                          type="button"
                          variant={"outline"}
                          onClick={handleAddRepoPath}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        {Object.entries(repoPath).map(([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center gap-2 bg-gray-200 p-2 rounded-lg "
                          >
                            <span>{`${key}: ${value}`}</span>
                            <XCircle
                              className="cursor-pointer"
                              onClick={() => handleRemoveRepoPath(key)}
                            />
                          </div>
                        ))}
                      </div>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <div className="tech-stack">
                  <FormField
                    control={form.control}
                    name="techStack"
                    render={() => (
                      <FormItem>
                        <FormLabel>Tech Stack</FormLabel>
                        <Select
                          onValueChange={(value) => handleAddTechStack(value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Tech stack used in the application" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {techStackOptions.map((tech) => (
                              <SelectItem key={tech} value={tech}>
                                {tech}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <div className="mt-4 flex flex-wrap gap-4">
                    {selectedTechStack.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center gap-2 bg-gray-200 p-2 rounded-lg"
                      >
                        <span>{tech}</span>
                        <XCircle
                          className="cursor-pointer"
                          onClick={() => handleRemoveTechStack(tech)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="databases">
                  <FormField
                    control={form.control}
                    name="databases"
                    render={() => (
                      <FormItem>
                        <FormLabel>Database</FormLabel>
                        <Select
                          onValueChange={(value) => handleDatabases(value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Databases used in the application" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {databaseName.map((db) => (
                              <SelectItem key={db} value={db}>
                                {db}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <div className="mt-4 flex flex-wrap gap-4">
                    {selectedDatabaseName.map((db) => (
                      <div
                        key={db}
                        className="flex items-center gap-2 bg-gray-200 p-2 rounded-lg"
                      >
                        <span>{db}</span>
                        <XCircle
                          className="cursor-pointer"
                          onClick={() => handleRemoveDatabases(db)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="applicationSMEName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Application SME Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Devendra Jha" {...field} />
                      </FormControl>
                      {/* <FormDescription>
                        This is your public display name.
                      </FormDescription> */}
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sharepointLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sharepoint Document Link</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ttx.sharepoint.com/ufd"
                          {...field}
                        />
                      </FormControl>
                      {/* <FormDescription>
                        This is your application prod url.
                      </FormDescription> */}
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="excelLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload S.P List</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".xlsx, .xls"
                          onChange={handleFileUpload}
                        />
                      </FormControl>
                      {uploading && (
                        <p className="flex gap">
                          {" "}
                          <Loader2 /> Uploading...
                        </p>
                      )}
                      {field.value && (
                        <p>
                          File uploaded:{" "}
                          <a
                            href={field.value}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {field.value}
                          </a>
                        </p>
                      )}
                      <FormDescription className="text-blue-400">
                        File should be in .xls format only
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              

              <Button type="submit" variant={"outline"}>
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

export default AddApplication;
