import type React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import he from "he";

interface RedditCardProps {
    title: string;
    selfTextHtml?: string;
    url?: string;
    score: number;
    contentSize?: "small" | "medium" | "large";
}

export const RedditCard: React.FC<RedditCardProps> = ({
    title,
    selfTextHtml,
    url,
    score,
}) => {

    return (
        <Card className="w-full h-full min-h-[300px] overflow-hidden transition-all hover:shadow-md flex flex-col border-0 shadow">
            <CardHeader className="p-2">
                <h3 className="font-bold text-sm">{title}</h3>
                {url && (
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-xs text-blue-600 hover:underline mt-1"
                    >
                        <ExternalLink className="mr-1 h-3 w-3" />
                        {
                            (() => {
                                try {
                                    const fullUrl = url.startsWith("http") ? url : `https://www.reddit.com${url}`;
                                    return new URL(fullUrl).hostname;
                                } catch {
                                    return "reddit.com";
                                }
                            })()
                        }
                    </a>
                )}
            </CardHeader>

            <CardContent className="py-1 px-2 flex-grow">
                {selfTextHtml && (
                    <div
                        className="prose prose-sm max-w-none text-gray-700 dark:text-white text-sm line-clamp-4"
                        dangerouslySetInnerHTML={{
                            __html: he.decode(selfTextHtml.replace(/<!--.*?-->/g, ""))
                        }}
                    />
                )}
            </CardContent>

            <CardFooter className="py-2 px-2 flex justify-between items-center mt-auto">
                <Badge variant={score > 0 ? "default" : "destructive"} className="flex items-center text-xs py-0 px-2">
                    <span className="font-medium">Score: {score}</span>
                </Badge>
            </CardFooter>
        </Card>
    );
};