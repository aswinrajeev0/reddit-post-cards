import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import classNames from "classnames";

interface SkeletonCardProps {
    contentSize?: "small" | "medium" | "large";
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ contentSize = "small" }) => {
    const getHeight = () => {
        switch (contentSize) {
            case "large":
                return "h-60";
            case "medium":
                return "h-44";
            default:
                return "h-32";
        }
    };

    return (
        <Card className="w-full h-full overflow-hidden flex flex-col border-0 shadow animate-pulse">
            <CardHeader className="py-2 px-2 space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
            </CardHeader>

            <CardContent className={classNames("flex-grow px-2", getHeight())}>
                <div className="bg-gray-200 dark:bg-gray-800 w-full h-full rounded" />
            </CardContent>

            <CardFooter className="py-2 px-2">
                <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
            </CardFooter>
        </Card>
    );
};
