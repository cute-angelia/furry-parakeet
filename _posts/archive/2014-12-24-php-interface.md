---
title: PHP的抽象类、接口的区别和选择
date: 2014-12-24 21:27:45
tags: [php]
---

## 区别：

1. 对接口的使用是通过关键字implements。对抽象类的使用是通过关键字extends。当然接口也可以通过关键字extends继承。

2. 接口中不可以声明成员变量（包括类静态变量），但是可以声明类常量。抽象类中可以声明各种类型成员变量，实现数据的封装。（另JAVA接口中的成员变量都要声明为public static final类型）

<!-- more -->

````
<?php 
abstract class Father {
	function meth1() {
		echo "meth1...<br>";
	}
	abstract function meth2();
	public $var1="var1";
	public static $var2="var2";
	const Var3="Var3";
}
class Son extends Father {
	function meth2() {
		echo "meth2 of Son...<br>";
	}
}
$s=new Son();
echo $s->var1."<br>";
echo Father::$var2."<br>";
echo Father::Var3."<br>";


Interface IFather {
	//public $iVar1="iVar1";        此处接口定义中不能包含成员变量
	//public static $iVar2="iVar2"; 此处接口定义中不能包含静态变量
	const iVar3="iVar3";
	function iMeth1();
}
Class ISon implements IFather {
	function iMeth1() {
		echo "iMeth1...<br>";
	}
}
$is=new ISon();
echo IFather::iVar3;
?>


````

3. 接口没有构造函数，抽象类可以有构造函数。

4. 接口中的方法默认都是public类型的，而抽象类中的方法可以使用private,protected,public来修饰。

5. 一个类可以同时实现多个接口，但一个类只能继承于一个抽象类。


## 抽象类还是接口?
> 如果要创建一个模型，这个模型将由一些紧密相关的对象采用，就可以使用抽象类。如果要创建将由一些不相关对象采用的功能，就使用接口。

> 如果必须从多个来源继承行为，就使用接口。
>
 如果知道所有类都会共享一个公共的行为实现，就使用抽象类，并在其中实现该行为。


[引用](http://blog.csdn.net/fanteathy/article/details/7309966)
