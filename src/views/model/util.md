<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-09-29 11:14:26
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-29 11:53:33
 -->
splitefilterSComArray：
生成数据:
        单个form中的数据:
        [//form.children
            [//row
                {
                    type:'input1',
                    model: 'input'
                },
                {
                    type:'input2',
                    model: 'input'
                }
            ],
            [
                {
                    type:'input3',
                    model: 'input'
                },
                {
                    type:'input4',
                    model: 'input'
                }
            ],
            [
                {
                    type:'input5',
                    model: 'input'
                }
            ]
        ]
filterSComFromForm: 多个form的起始数据结构
生成数据:
    [
        {   
            type: 'form',
            model: 'form1',
            children: [
                {
                    model:'input1',
                    type: 'input',
                    x: '',
                    y: '',
                    width: '',
                    height: '',
                },
                {
                    model:'input2',
                    type: 'input',
                    x: '',
                    y: '',
                    width: '',
                    height: '',
                },
                {
                    model:'input3',
                    type: 'input',
                    x: '',
                    y: '',
                    width: '',
                    height: '',
                }
            ]
        }，
        {
            type: 'form',
            model: 'form2',
            children: [
                {
                    model:'input1',
                    type: 'input',
                    x: '',
                    y: '',
                    width: '',
                    height: '',
                },
                {
                    model:'input2',
                    type: 'input',
                    x: '',
                    y: '',
                    width: '',
                    height: '',
                },
                {
                    model:'input3',
                    type: 'input',
                    x: '',
                    y: '',
                    width: '',
                    height: '',
                }
            ]
        }
    ]

    splitefilterSComArrayAddRow:在splitefilterSComArray的基础上给数组第二层数组封装成对象
    splitefilterSComArrayAddRow:
    生成数据:
        [//form.children
        
            {
                type: 'row',
                children: [
                    {
                        type:'input1',
                        model: 'input'
                    },
                    {
                        type:'input2',
                        model: 'input'
                    }
                ]
            },
            {
                type: 'row',
                children:[
                    {
                        type:'input3',
                        model: 'input'
                    },
                    {
                        type:'input4',
                        model: 'input'
                    }
                ]
            }
           
            {
                type: 'row',
                children:   [
                    {
                        type:'input5',
                        model: 'input'
                    }
                ]
            }
            
        ]