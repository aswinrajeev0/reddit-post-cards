export const fetchData = async () => {
    try {
        const response = await fetch("https://www.reddit.com/r/reactjs.json",{
            method: "GET"
        });
        return await response.json();
    } catch (error: any) {
        throw error.response.data;
    }
}