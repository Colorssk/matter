<!--
 * @Descripttion: 
 * @version: 
 * @Author: Colorssk
 * @Date: 2019-09-20 14:42:24
 * @LastEditors: Colorssk
 * @LastEditTime: 2019-10-10 09:40:45
 -->
<template>
    <Table :columns="column1" :data="data1">
    </Table>
    
    <Card style="width:80%; left: 10px;">
    
        <Form :ref="form" :model="form">
    
            <Row>
    
                <Col :span="12">
    
                <Input v-model="input1" placeholder="请输入" />
    
                </Col>
    
                <Col :span="12">
    
                <Select v-model="select1"> <Option v-for="item in select1s" :value="item.value" :key="item.key">{{ item.label }}</Option></Select>
    
                </Col>
    
            </Row>
    
            <Row>
    
                <Col :span="8">
    
                <Input v-model="input2" placeholder="请输入" />
    
                </Col>
    
                <Col :span="8">
    
                <Select v-model="select2"> <Option v-for="item in select2s" :value="item.value" :key="item.key">{{ item.label }}</Option></Select>
    
                </Col>
    
                <Col :span="8">
    
                <Select v-model="select3"> <Option v-for="item in select3s" :value="item.value" :key="item.key">{{ item.label }}</Option></Select>
    
                </Col>
    
            </Row>
    
        </Form>
    </Card>
   
</template>

<script>
export default {

}
</script>

<style>

</style>