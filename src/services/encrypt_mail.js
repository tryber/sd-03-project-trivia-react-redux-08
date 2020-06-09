import md5 from 'crypto-js/md5';

const hashedMail = (string) => md5(string).toString();

export default hashedMail;
