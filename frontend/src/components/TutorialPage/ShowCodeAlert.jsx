import {AlertDialog, AlertDialogContent, AlertDialogTrigger} from "@/components/ui/alert-dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useState} from "react";

const ShowCodeAlert = ({imageSource, textButtonTrigger}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" className = {`text-black w-fit`}>{textButtonTrigger}</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className = {`bg-transparent backdrop-blur max-w-2xl rounded-2xl`}>
                    <div className={`flex flex-col gap-y-5`}>
                            <img src={imageSource} className = {`w-full bg-neutral-50`} />
                        <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ShowCodeAlert;