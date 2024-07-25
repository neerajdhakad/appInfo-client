import { ArrowLeft, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
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
// import { toast } from "../components/ui/toaster"

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
const databaseName = ["FDUFDDB","EDMTTX",]

function AddApplication() {
  const [selectedTechStack, setSelectedTechStack] = useState([]);
  const [selectedDatabaseName, setSelectedDatabaseName] = useState([]);

  const handleAddTechStack = (tech:string) => {
    if (!selectedTechStack.includes(tech)) {
      setSelectedTechStack([...selectedTechStack, tech]);
      form.setValue("techStack", [...selectedTechStack, tech]);
    }
  };

  const handleRemoveTechStack = (tech:string) => {
    const updatedTechStack = selectedTechStack.filter((t) => t !== tech);
    setSelectedTechStack(updatedTechStack);
    form.setValue("techStack", updatedTechStack);
  };
  const handleDatabases = (db:string) => {
    if (!selectedDatabaseName.includes(db)) {
      setSelectedDatabaseName([...selectedDatabaseName, db]);
      form.setValue("databases", [...selectedDatabaseName, db]);
    }
  };

  const handleRemoveDatabases = (db) => {
    const updatedDatabases = selectedDatabaseName.filter((t) => t !== db);
    setSelectedDatabaseName(updatedDatabases);
    form.setValue("databases", updatedDatabases);
  };

  const formSchema = z.object({
    applicationName: z.string().min(2, {
      message: "Application Name must be at least 2 characters.",
    }),
    prodUrl: z.string().url({ message: "Invalid url" }),
    applicationSMEName: z.string().min(2, {
      message: "Application SME Name must be at least 2 characters.",
    }),
    sharepointLink: z.string().url({ message: "Invalid url" }),
    techStack: z.array(z.string()).nonempty({ message: "At least one tech stack must be selected." }),
    databases: z.array(z.string()).nonempty({ message: "At least one Database must be selected." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicationName: "",
      prodUrl: "",
      applicationSMEName: "",
      // applicationType:"",
      sharepointLink: "",
      techStack: [],
      databases: [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <>
      <div className="py-4 px-8 flex items-center gap-4 shadow-md dark:bg-gray-800 dark:text-white">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="applicationName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Applcation Name</FormLabel>
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
                        <Input
                          placeholder="https://dev.azure.com/ttx/ufd"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your application prod url.
                      </FormDescription>
                      <FormMessage className="text-red-500" />
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
                          <SelectContent >
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
                          <SelectContent >
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
                      <FormLabel>Applcation SME Name</FormLabel>
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
