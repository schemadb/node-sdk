export const toBytesInt32 = (num) => {
    const buff = Buffer.alloc(4);
    buff.writeInt32BE(num);
    return buff;
};
