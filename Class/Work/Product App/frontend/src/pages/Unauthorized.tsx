import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function Unauthorized() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <Card className="w-[380px] shadow-xl border border-gray-200 dark:border-gray-800">
                <CardHeader>
                    <CardTitle className="text-center text-red-600 dark:text-red-400">
                        Access Denied 🚫
                    </CardTitle>
                    <CardDescription className="text-center">
                        You do not have permission to view this page.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 items-center mt-4">
                    <Button
                        variant="default"
                        className="w-full"
                        onClick={() => navigate("/")}
                    >
                        Go to Home
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => navigate(-1)}
                    >
                        Go Back
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
