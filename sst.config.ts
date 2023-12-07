import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      name: "sstMultistack",
      region: "us-east-1",
      Stage: "dev"
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({
      runtime: "python3.11"
    })
   app.stack(API);
   
  }
} satisfies SSTConfig;
