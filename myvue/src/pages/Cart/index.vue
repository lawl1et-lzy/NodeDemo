<template>
  <div class="wrap-cart">
    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="items"
        label="ITEMS"
        width="120">
        <template slot-scope="scope">
          <img :src="require(`../../images/${scope.row.productImage}`)"/>
          {{ scope.row.productName }}
        </template>
      </el-table-column>
      <el-table-column
        prop="salePrice"
        label="PRICE"
        width="120">
      </el-table-column>
      <el-table-column
        prop="productNum"
        label="QUANTITY"
        >
      </el-table-column>
      <el-table-column
        prop="subtotal"
        label="SUBTOTAL"
        width="120">
      </el-table-column>
      <el-table-column
        prop="edit"
        label="EDIT"
        width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 页码 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum">
    </el-pagination>
  </div>
</template>

<script>
import Api from '../../api/index.api'
export default {
  name: 'Cart',
  data () {
    return {
      user: '',
      tableData: [],
      multipleSelection: [], // 多选框选项

      // 分页
      currentPage: 1, // 当前页
      pageSize: 2, // 默认显示[每页显示多少条]
      pageSizes: [2, 3, 4, 5], // 每页显示多少条选项
      totalNum: 0 // 共多少条
    }
  },
  computed: {
    // 组合查询属性
    cartQueryParam () {
      return {
        page: this.currentPage,
        pageSize: this.pageSize,
        userid: this.user ? this.user.userId : ''
      }
    }
  },
  watch: {
    cartQueryParam: {
      handler (n) {
        if (n) {
          this.fetchCartList(n)
        }
      },
      deep: true
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleDelete (index, row) {
      console.log(`index:${index};`)
      console.log('row', row)
      let reqParam = {
        productId: row.productId,
        userId: this.user.userId
      }
      Api.delCart(reqParam)
        .then(res => {
          let { response } = res
          if (!response.error_code) {
            this.tableData.splice(0, index + 1)
            this.$message({
              message: '删除成功',
              center: true,
              duration: 1 * 1000
            })
          }
        })
        .catch(err => {
          console.log('handleDelete err', err)
        })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
    },
    fetchCartList (queryParam) {
      Api.getCartList(queryParam)
        .then(res => {
          let { info, response } = res
          if (!response.error_code) {
            this.handleCartList(info)
          }
        })
        .catch(err => {
          console.log('fetchCartList err', err)
        })
    },
    handleCartList (info) {
      let { data, totalNum } = info
      this.totalNum = totalNum
      this.tableData = data
      this.tableData.forEach(item => {
        item.subtotal = item.productNum * item.salePrice
      })
    }
  },
  created () {
    this.user = this.$cookie.get('user') ? JSON.parse(this.$cookie.get('user')) : ''
    if (!this.user) {
      this.$router.push({ path: '/login' })
      return false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
