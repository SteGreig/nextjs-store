const truncate = (str: string, length: number) => {
  return str.length < length ? str : str.substr(0, length);
};

export default truncate;
