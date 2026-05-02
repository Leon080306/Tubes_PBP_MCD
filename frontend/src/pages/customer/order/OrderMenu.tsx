/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import PackageSelection from "./MakePackage";
import SetQuantity from "./SetQuantity";
import Recommendation from "./Recommendation";
import Modification from "./Modification";
import PackageList from "./PackageList";
import { useParams } from "react-router";

export default function OrderMenu() {
    const { cartItemId } = useParams();
    const [step, setStep] = useState("package");

    useEffect(() => {
        setStep("package");
    }, [cartItemId]);

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
        </>
    );
}