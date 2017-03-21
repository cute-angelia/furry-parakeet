title: 抽奖类活动项目的一些技术Tips
date: 2014-03-24 13:42:12
tags: [活动, think]
---
## 背景：

一般互联网产品为了拉升人气等，会有各种运营活动，活动一般会发实物奖品，就会吸引很多用户来抽奖，当然里面也会混杂很多专业刷奖的人，他们关注各个公司的抽奖活动以刷奖为生，所以我们的抽奖系统一定要设计的符合这种实际情况才安全，否则把奖品发超了，引来用户投诉吐槽，说明代码写的不到位，会影响技术人员的光荣伟大正确的形象的。（奖品内定或者程序里埋雷不属于本讨论范畴）

<!-- more -->

## Tips：

1. 接入层：
	反作弊要做的合理恰当，要限制某个ip某个用户抽奖的次数，特别是ip，比如一天只能抽几次，或者每次花费多少积分之类的，防止被刷奖；抽奖限制最好使用缓存而不是数据库来存储限制值，因为db太慢，用户并发几百上千的请求来的时候，你数据都还没到db，db先挂了。

2. 代码层：
	不要用复杂的抽奖算法，因为不可控，只做最简单的抽奖算法，包括策略比例都最简单，适当的把一些抽奖策略放到配置里面。实际发奖这件事儿把这件事丢给db做，一般代码层干的事儿就是过滤掉大部分想得到奖品的请求，然后把小部分有机会进入获奖途径的人放入db，然后再db层随机某个奖池出奖；

	补充：2016-4-22 10:19:21
	抽奖另类需求：

	1、概率设置非100%

	    设置概率 1/1000, 10/100, 40/1000, 1/10000，我们可以计算`公倍数`统一处理

	    //计算公倍数注意int长度

	2、某段时间内必出该奖品
    设置奖品A在 10:00-11:00 必出, 根据时间范围长度，不断增加该奖品概率，至中奖

    ````
        $must_start_at = strtotime($award ['lottery_startat']);
        $must_end_at = strtotime($award ['lottery_endat']);

        //符合时间内
        if ($must_start_at && $must_end_at && $must_start_at <= time() && time() <= $must_end_at) {
            $r = rand($must_start_at, $must_end_at);
            if ($r <= time()) {
                $lucky_award [] = $award;
                break;
            }
        }
    ````

    3、风控，用户每天中同一奖品次数，中的总次数
    原子计数redis非常合适统计次数

    4、风控，奖品每天出的次数
    5、人品值，用户对每个奖品人品变化值
    比如用户人品值100，A奖品对应人品值10，用户中改奖品后，人品降落至90,
    中奖概率 * 90%

3. 数据层：
	数据层按照奖池的模式来设计，比如一天发放多少个奖品，就用定时程序每天凌晨0点把今天要发的奖品都初始化到db里，然后变成今天的奖池。还有一定要注意奖品数量数据类型，对于奖品数量这种字段，务必使用有符号整形（千万切记不要使用无符号整形，否则你在针对这些字段做减少操作的时候，可能溢出变成21亿，就完蛋了。
	还有就是要给数据加锁，一般在一个奖品变化的时候，直接使用事务的方式进行调整，然后把事务隔离级别调高，基本就能保证一个字段数据同时只能一个session进行操作，保证奖品数据不会异常。再进行减少奖品数量的时候，务必判断奖品数量是否大于0，类似：update xxxx set total = total - 1 where total > 0; 如果不放心，可以适当使用 for update 保证串行执行更新操作。

4. 测试：
	线下最好做压力测试，因为用户会刷你，你要看看代码是否坚强可靠，最好的办法就是做压力测试

5. 其他：
	奖品发放一般建议白天，因为晚上刷奖的人比较多，所以在奖品设置的时候，最好晚上阶段就不怎么放奖品，省得出问题半夜起来解决问题。另外，最好奖品发放能够细化到每个时间点，比如说A奖品分别在每两个小时放一个，这个发放时间最好是比较固定的，这样才可控，千万不要什么概率随机算法之类的给自己添堵。
	还有奖品发放的上下游记录要清晰，哪个IP、什么时候、获得某个奖品，然后建议奖品获得后不要着急给用户快递，最好能够有一些审计，比如说某个IP获得多个奖品，那就可能是刷的。
	所以为了保障期间，所有活动说明都需要明确表示出最终解释权归活动主办方（不过这个貌似国家有规定不能这么说），反正要留下足够多的回旋空间，给抽奖程序出问题或者抽奖规则变化留下空间。

<abbr title="End of file">EOF</abbr>