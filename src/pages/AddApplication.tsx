/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeft, XCircle } from "lucide-react";
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
import { useEffect, useState } from "react";
import { Url } from "url";
import {getTechStacks} from '../API/Api'
// import { useToast } from "../components/ui/use-toast"

// const techStackOptions = [
//   "Angular",
//   ".NET",
//   "React.js",
//   "Vue.js",
//   "Node.js",
//   "Java",
//   "Python",
//   "Ruby on Rails",
//   "Django",
//   "Flask",
//   "Spring Boot",
//   "Laravel",
//   "ASP.NET",
//   "Svelte",
//   "Ember.js",
//   "Backbone.js",
//   "Express.js",
//   "Koa.js",
//   "Next.js",
//   "Nuxt.js",
//   "Gatsby.js",
//   "JQuery",
//   "Meteor.js",
//   "Aurelia",
//   "FastAPI",
// ];

// eslint-disable-next-line @typescript-eslint/no-unused-vars

interface RepoPath {
  [key: string]: Url;
}
interface Database {
  [key: string]: Url;
}
interface TechStack {
  _id:string,
  techStackName: string;
  logo: string;
}

function AddApplication() {
  // const { toast } = useToast();
  const [TechStacksFromAPI,setTechStacksFromAPI] = useState<TechStack[]>([]);
  const [selectedTechStack, setSelectedTechStack] = useState<TechStack[]>([]);
  const [repoPath, setRepoPath] = useState<RepoPath>({});
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const [database, setDatabase] = useState<Database>({});
  const [serverName, setServerName] = useState<string>("");
  const [dBName, setDBName] = useState<string>("");

  const [uploading, setUploading] = useState(false); 
 
  const handleAddTechStack = (techId: string) => {
    const tech = TechStacksFromAPI.find(t => t._id === techId);
    console.log('Selected Tech:', tech);  // Add this log
    console.log('Selected TechStack:', selectedTechStack);
    if (tech && !selectedTechStack.some(t => t._id === tech._id)) {
      const updatedTechStack = [...selectedTechStack, tech];
      setSelectedTechStack(updatedTechStack); 
      form.setValue("techStack", updatedTechStack as any);
    }
  };

  const handleRemoveTechStack = (techId: string) => {
    const updatedTechStack = selectedTechStack.filter(t => t._id !== techId);
    setSelectedTechStack(updatedTechStack);
    form.setValue("techStack", updatedTechStack as any);
  };

  // const handleDatabases = (db: string) => {
  //   if (!selectedDatabaseName.includes(db)) {
  //     setSelectedDatabaseName([...selectedDatabaseName, db]);
  //     form.setValue("databases", [...selectedDatabaseName, db] as any);
  //   }
  // };

  // const handleRemoveDatabases = (db: string) => {
  //   const updatedDatabases = selectedDatabaseName.filter((t) => t !== db);
  //   setSelectedDatabaseName(updatedDatabases);
  //   form.setValue("databases", updatedDatabases as any);
  // };

  const handleAddRepoPath = () => {
    if (newKey && newValue) {
      const updatedRepoPath = { ...repoPath, [newKey]: newValue };
      setRepoPath(updatedRepoPath as any);
      form.setValue("repoPath", updatedRepoPath as any);
      setNewKey("");
      setNewValue("");
    }
  };

  const handleRemoveRepoPath = (key: string) => {
    const updatedRepoPath = { ...repoPath };
    delete updatedRepoPath[key];
    setRepoPath(updatedRepoPath);
    form.setValue("repoPath", updatedRepoPath as any);
  };
  const handleAddDatabsae = () => {
    if (serverName && dBName) {
      const updatedDatabase = { ...database, [serverName]: dBName };
      setDatabase(updatedDatabase as any);
      form.setValue("database", updatedDatabase as any);
      setServerName("");
      setDBName("");
    }
  };

  const handleRemoveDatabase = (key: string) => {
    const updatedDatabase = { ...database};
    delete updatedDatabase[key];
    setDatabase(updatedDatabase);
    form.setValue("database", updatedDatabase as any);
  };

  const techStackSchema = z.object({
    _id: z.string(),
    techStackName: z.string(),
    logo: z.string().url({ message: "Invalid URL for logo" })
  });

  const formSchema = z.object({
    applicationName: z.string().min(2, {
      message: "Application Name must be at least 2 characters.",
    }),
    prodUrl: z.string().url({ message: "Invalid url" }),
    applicationType: z.string().min(5, { message: "Must be 5 or fewer characters long" }),
    repoPath: z
      .record(z.string(), z.string().url({ message: "Invalid URL" }))
      .refine((data) => Object.keys(data).length > 0, {
        message: "At least one Repo path must be added.",
      }),
    database: z
      .record(z.string(), z.string())
      .refine((data) => Object.keys(data).length > 0, {
        message: "At least one Database must be added.",
      }),
    // SPExcelSheet : z.string().url({message:"upload Excel sheet"}) ,
    excelLink: z.string().url().optional(),
    applicationSMEName: z.string().min(2, {
      message: "Application SME Name must be at least 2 characters.",
    }),
    accessRequired: z.string().min(5, { message: "Must be 5 or fewer characters long" }),
    sharepointLink: z.string().url({ message: "Invalid url" }),
    techStack: z
    .array(techStackSchema)
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
      accessRequired:"",
      repoPath: {},
      sharepointLink: "",
      techStack: [],
      database: {},
      applicationType:"",
      excelLink: "https://ufd.ttx.com",
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
        let url = await uploadToCloudinary(file);
        url = "https://ufd.ttx.com"
        form.setValue("excelLink", url);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  useEffect(() => {
    const fetchTechStacks = async () => {
      try {
        const response = await getTechStacks();
        console.log("Response from API: ", response);

        if (response.isSuccess && response.result) {
          setTechStacksFromAPI(response.result);
          console.log("RESULT ARRAY : ",response.result)
        } else {
          console.error("API response indicates failure or no result found:", response.data.errors);
        }
      } catch (error) {
        console.error("Error fetching TechStacks:", error);
      }
    };
    fetchTechStacks();
  }, []);

  // useEffect(() => {
  //   console.log("Form Errors:", form.formState.errors);
  // }, [form.formState.errors]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <>
      <div className="fixed w-full py-4 px-8 flex items-center gap-4 shadow-md bg-white dark:bg-gray-800 dark:text-white">
        <Link to={"/"}>
          <ArrowLeft />
        </Link>
        <div className="text-2xl cursor-pointer">Add Application details</div>
      </div>
      <p className="pt-24 text-2xl font-bold px-8 py-4">Add Application</p>
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
              <div className="repoPath">
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
                      <div className="flex flex-wrap items-center gap-4 mt-4">
                        {Object.entries(repoPath).map(([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center gap-2 border-2 border-dashed p-2 rounded-lg"
                          >
                            <span>{`${key}:${value}`}</span>
                            <XCircle
                              className="cursor-pointer hover:text-red-500"
                              onClick={() => handleRemoveRepoPath(key)}
                            />
                          </div>
                        ))}
                      </div>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
              </div>

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
                            {TechStacksFromAPI.map((tech) => (
                              <SelectItem key={tech._id} value={tech._id}>
                                <div className="flex gap-3">
                                <img className="w-6 h-6" src={tech?.logo} alt="logo" />
                                {tech.techStackName}
                                </div>
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
                        key={tech._id}
                        className="flex items-center gap-2 border-2 border-dashed p-2"
                      >
                        <img className="w-6 h-6" src={tech.logo} alt="logo" />
                        <span className="">{tech.techStackName}</span>
                        <XCircle
                          className="cursor-pointer text-gray-400 hover:text-red-500"
                          onClick={() => handleRemoveTechStack(tech._id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="databases">
                <FormField
                  control={form.control}
                  name="database"
                  render={() => (
                    <FormItem>
                      <FormLabel>Database</FormLabel>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Server name"
                          value={serverName}
                          onChange={(e) => setServerName(e.target.value)}
                        />
                        <Input
                          placeholder="Database name"
                          value={dBName}
                          onChange={(e) => setDBName(e.target.value)}
                        />
                        <Button
                          type="button"
                          variant={"outline"}
                          onClick={handleAddDatabsae}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 mt-4">
                        {Object.entries(database).map(([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center gap-2 border-2 border-dashed p-2 rounded-lg"
                          >
                            <span>{`${key}:${value}`}</span>
                            <XCircle
                              className="cursor-pointer hover:text-red-500"
                              onClick={() => handleRemoveDatabase(key)}
                            />
                          </div>
                        ))}
                      </div>
                      <FormDescription className="text-blue-400">
                        Please Add your Application Server and DB names.
                      </FormDescription>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

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
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="applicationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Application Type</FormLabel>
                      <FormControl>
                        <Input placeholder="Web Application" {...field} />
                      </FormControl> 
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accessRequired"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Access Required</FormLabel>
                      <FormControl>
                        <Input placeholder="Maintain,AppUser,Request Admin" {...field} />
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
                      <FormMessage className="text-red-500" />
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
