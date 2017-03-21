title: IFTTT
date: 2016-02-01 17:07:17
tags: [ifttt, think]
---

排除一些唯心主义，我们万事万物都几乎充满了因果循环，蝴蝶效应在任何地方都会上演。

因为XX，所以YY

## 理念

> IFTTT = If this then that 如果这样就那样

![ifttt](/uploads/ifttt.png)

在使用 IFTTT 的过程中，我们主要就是要创建自己的 `Recipes` (流程) 来为自己服务。
一个工作流程我们称为`Recipes`，你可以理解为一个由你自己组合出来的「功能」。
`Recipes` 的目的是打通 「this」 和 「that」 两个网络服务
网络服务在这里称为 `Channels` (频道)，前者称为 `Trigger Channel` (触发器频道)，后者称为 `Action Channel` (动作频道)
当触发器频道满足触发条件，那么就会执行动作频道指定的动作。

### 举个例子：消息推送

假如：「如果服务器挂了，那么就自动推送消息到订阅方」，服务器挂了 就是触发器频道，推送消息 就是动作频道。

所以，IFTTT 创建一个「Recipes 流程」的流程如下：
选择一个触发器频道，设置它的触发条件，再选择一个动作频道，然后设置它要执行的动作，OK，这样就搞定了

理论上，这可以做很多事。

注：动作也是可以自定义的，目前本文档例子是消息通知，手机短信方式。甚至服务器监控，动作可以是重启某项服务
