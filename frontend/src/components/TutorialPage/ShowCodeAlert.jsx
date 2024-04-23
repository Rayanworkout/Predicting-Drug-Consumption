import {AlertDialog, AlertDialogContent, AlertDialogTrigger} from "@/components/ui/alert-dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useState} from "react";

const ShowCodeAlert = ({text, textButtonTrigger}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" className = {`text-black w-fit`}>{textButtonTrigger}</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className = {`bg-transparent backdrop-blur max-w-sm rounded-2xl`}>
                    <div className={`flex flex-col gap-y-5`}>
                        <div className = {`flex flex-col text-white gap-y-2 text-xs md:text-sm`}>
                            {text}
                        </div>
                        <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ShowCodeAlert;