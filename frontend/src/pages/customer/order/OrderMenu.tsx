import { useState } from "react";
import PackageSelection from "./MakePackage";
import SetQuantity from "./SetQuantity";
import Recommendation from "./Recommendation";
import Modification from "./Modification";
import Cart from "./Cart";
import PackageList from "./PackageList";

export default function OrderMenu() {
    const [step, setStep] = useState("package");
    // const { menuId } = useParams();

    // if (stepParam) {
    //     setStep(stepParam);
    // }

    return (
        <>
            {step === "package" && (
                <PackageSelection
                    onNext={(nextStep: string) => setStep(nextStep)}
                />
            )}
            {step === "package-list" && (
                <PackageList
                    onNext={(nextStep: string) => setStep(nextStep)}
                />
            )}
            {step === "quantity" && (
                <SetQuantity
                    onNext={(nextStep: string) => setStep(nextStep)}
                />
            )}
            {step === "recommendation" && (
                <Recommendation
                    onNext={(nextStep: string) => setStep(nextStep)}
                />
            )}
            {step === "modification" && (
                <Modification
                    onNext={(nextStep: string) => setStep(nextStep)}
                />
            )}
            {step === "cart" && (
                <Cart
                    onNext={(nextStep: string) => setStep(nextStep)}
                />
            )}
        </>
    );
}