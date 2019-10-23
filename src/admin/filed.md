# product
```  title: String, // 产品标题
  sub: String, // 简介
  content: String, // 详细介绍，富文本
  productCateName: Number, // 产品分类;
  listImg: String, // 列表图
  detailImgs: String, // 图片集合，串用逗号分隔
  created: Number, // 创建时间戳
  weight: Number, // 权重
  status: Number, // 状态【1:上线/2:下载】
  pv: Number, // 浏览量
```

# news
```
  title: String, // 产品标题
  sub: String, // 简介
  content: String, // 详细介绍，富文本
  type: Number, // 分类; 1:
  listImg: String, // 列表图
  created: Number, // 创建时间戳
  status: Number, // 状态【1:上线/2:下载】
  weight: Number, // 权重
  pv: Number, // 浏览量
```

# faqs
weight 权重
status 上线/下载
created 发布时间/创建时间
_id
index 序号
q 问题
a 回答


#banner

```
  title: String, // banner 标题名称
  imgUrl: String, // 图片地址
  link: String, // 跳转链接
  flag: Number, // banner位置，1.首页 2.产品页 3.新闻 4.faqs 5. about 6. 联系页面
  created: Number, // 创建时间戳
```


#params
created 发布时间/创建时间
_id
name 分类名
flag 分类项目 1.产品分类

# email
```
  name: String, // 名字
  email: String, // 邮箱
  phone: String, // 电话
  company: String, // 公司
  subject: String, // 标题
  content: String, // 正文
  created: Number, // 创建时间戳
```
