const cookiesSerialize = (cookies: Record<string, string>): string => {
    const parts = Object.keys(cookies).map((key: string) => {
        return `${key}=${cookies[key]}`;
    });

    return parts.join('; ');
};

export default cookiesSerialize;
