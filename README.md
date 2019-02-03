# ForwardSSH

## 应用场景

设备A处在一个内网里通过NAT或类似的技术连接到互联网，设备B也连接到互联网（使用或没有NAT都没关系），设备B想要通过ssh连接A，但是因为A没有外网IP地址，所以没办法连接。

## 需求

* 一台有外网IP地址的服务器

* NodeJS运行环境

## 用法

先将client.js和server.js文件中开头的常量的含义如下，请根据自己服务器的参数做修改：

* HOST_IP为服务器的外网IP地址（一定要和自己服务器的IP一致）
* HOST_PORT为服务给设备A的通讯端口（可以不修改，但要保证服务器的防火墙没有拦截该端口）
* NAT_PORT为服务器给设备B的通讯端口（可以不修改，但要保证服务器的防火墙没有拦截该端口）

将client.js文件放到设备A，用命令```node client.js```运行

将server.js放到服务器，用命令```node server.js```运行

在设备B可以通过类似下面的命令用ssh和scp连接设备A

```bash
ssh USER_NAME@HOST_IP -p NAT_PORT
```

