# -*- coding: utf8 -*-

import time
import pymysql.cursors

# Connect to the database
connection = pymysql.connect(host='localhost',
                             user='user',
                             password='123456',
                             db='telecom',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

products = [
    {
        "name": "4G飞享套餐 18元",
        "description": "通话分钟数：无\n被叫免费范围：全国\n数据流量：100M\n数据业务：来电显示",
        "image_url": "http://www.10086.cn/images/apps/fee/4g_50.gif",
        "type": 0
    },
    {
        "name": "4G飞享套餐 28元",
        "description": "通话分钟数：国内主叫国内50分钟\n被叫免费范围：全国\n数据流量：100M\n数据业务：来电显示",
        "image_url": "http://www.10086.cn/images/apps/fee/4g_50.gif",
        "type": 0
    },
    {
        "name": "4G飞享套餐 38元",
        "description": "通话分钟数：国内主叫国内50分钟\n被叫免费范围：全国\n数据流量：300M\n数据业务：来电显示",
        "image_url": "http://www.10086.cn/images/apps/fee/4g_50.gif",
        "type": 0
    },
    {
        "name": "4G飞享套餐 48元",
        "description": "通话分钟数：国内主叫国内50分钟\n被叫免费范围：全国\n数据流量：500M\n数据业务：来电显示",
        "image_url": "http://www.10086.cn/images/apps/fee/4g_50.gif",
        "type": 0
    }
]

try:
    with connection.cursor() as cursor:
        # Create a new record
        for i in xrange(100):
            updated_at, created_at = int(time.time()), int(time.time())
            sql = "INSERT INTO `users` (`email`, `password`) VALUES (%s, %s)"
            cursor.execute(sql, ('webmaster@python.org', 'very-secret'))

    # connection is not autocommit by default. So you must commit to save
    # your changes.
    connection.commit()
finally:
    connection.close()
