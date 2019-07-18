<template>
  <div class="wrap-naotu">
    <el-row>
      <el-button type="primary" @click="handleAddNaotu">Add</el-button>
    </el-row>
    <!-- table -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      border
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        width="400">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column
        prop="value"
        label="VALUE"
        width="500">
      </el-table-column>
      <el-table-column
        prop="edit"
        label="EDIT"
        width="300">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Api from '@/api/index.api'
export default {
  name: 'Naotu',
  data () {
    return {
      multipleSelection: [], // 多选框选项
      tableData: [] // 表格数据
    }
  },
  created () {
    this.queryNaotu()
  },
  methods: {
    // 多选框
    handleSelectionChange (val) {
      console.log('handleSelectionChange val', val)
      this.multipleSelection = val
    },
    // 点击行
    handleRowClick (row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    // 编辑
    handleEdit (index, row) {
      let id = row.id
      if (id) {
        this.$router.push({'name': 'NaotuEditor', 'params': { id }})
      }
    },
    // 删除
    handleDelete (index, row) {
      let id = row.id
      let rp = {
        id
      }
      this.delNaotu(index, rp)
    },
    delNaotu (index, rp) {
      Api.delNaotu(rp)
        .then(res => {
          let { response } = res
          if (!response.error_code) {
            this.queryNaotu()
            this.$message({
              message: '删除成功',
              center: true,
              duration: 2 * 1000
            })
          } else {
            this.$message({
              message: response.hint_message,
              center: true,
              duration: 2 * 1000
            })
          }
        })
        .catch(err => {
          console.log('queryNaotu', err)
        })
    },
    // 查询脑图
    queryNaotu () {
      Api.queryNaotu()
        .then(res => {
          let { response, data } = res
          if (!response.error_code) {
            this.tableData = data
          } else {
            this.$message({
              message: response.hint_message,
              center: true,
              duration: 2 * 1000
            })
          }
        })
        .catch(err => {
          console.log('queryNaotu', err)
        })
    },
    // 新增脑图
    handleAddNaotu () {
      let id = this.generateVVID().split('-').join('')
      let rp = {
        id
      }
      this.addNaotu(rp)
    },
    addNaotu (rp) {
      Api.addNaotu(rp)
        .then(res => {
          let { response, data } = res
          if (!response.error_code) {
            this.$router.push({'name': 'NaotuEditor', 'params': { id: data.id }})
          } else {
            this.$message({
              message: response.hint_message,
              center: true,
              duration: 2 * 1000
            })
          }
        })
        .catch(err => {
          console.log('addNaotu', err)
        })
    },
    // 生成随机值
    generateVVID () {
      let d = new Date().getTime()
      let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x7) | 0x8).toString(16)
      })
      return uuid
    }
  }
}
</script>
