export const checkIP = (rule: any, value: any, callback: any) => {
  if (
    /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))?$/.test(
      value
    )
  ) {
    callback();
  } else {
    callback(new Error("IP：端口格式错误"));
  }
};
