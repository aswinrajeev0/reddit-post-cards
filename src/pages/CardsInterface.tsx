import { useEffect, useState } from "react";
import { fetchData } from "../services/getData";
import { RedditCard } from "@/components/reddit-card";
import { ThemeSelector } from "@/components/theme-selector";
import type { ICardData, IPost } from "@/types/cardData";
import { SkeletonCard } from "@/components/skeleton-card";
import logo from "../assets/reddit-logo.png"

export default function CardsInterface() {
    const [redditPosts, setRedditPosts] = useState<IPost[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const getData = async () => {
            const fetchedData = await fetchData();
            setRedditPosts((fetchedData?.data?.children || []) as IPost[]);
            setIsLoading(false);
        };
        getData();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <div className="flex justify-center items-center gap-3">
                    <img src={logo} alt="" width={"30px"} />
                    <h1 className="text-2xl font-bold">Reddit Post Cards</h1>
                </div>
                <ThemeSelector />
            </div>

            <div className="mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {isLoading
                        ? Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="col-span-1">
                                <SkeletonCard contentSize="small" />
                            </div>
                        ))
                        : redditPosts.map(post => {
                            const postData = post.data as ICardData;

                            return (
                                <div key={postData.id} className="col-span-1">
                                    <RedditCard
                                        title={postData.title}
                                        selfTextHtml={postData.selftext_html}
                                        url={postData.url}
                                        score={postData.score}
                                    />
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}