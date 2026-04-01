import { toast } from "sonner";

export const useToast = ({msg}:{msg:string}) => {
 
  return {
    success: (msg: string) => {
   
      toast.success(msg);
    },
    error: (msg: string) => {
   
      toast.error(msg);
    },
  };
};