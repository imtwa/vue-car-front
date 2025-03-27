# 3D汽车展示系统-服务端
基于狸花猫后台管理系统二开
源码地址：https://gitee.com/yukino_git/lihua

#### 项目环境
Java 17+（推荐 Java 21，21以下建议删除虚拟线程配置，并自行配置线程池）

MySQL 8+

node 20+（或兼容 vue3 版本）

Redis 3+

#### 注意
需要更改 car-service\lihua-admin\src\main\resources中的application-dev.yml和application-prod.yml
修改Mysql和Redis的地址和端口，修改文件上传保存地址

进入car-service/lihua-admin/src/main/java/com/lihua/LiHuaApplication.java运行服务端项目

#### 数据库脚本默认账号密码
账号：admin
密码：admin123