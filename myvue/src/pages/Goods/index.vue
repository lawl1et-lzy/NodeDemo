<template>
  <div class="goods">
    <!-- head -->
    <section class="goods-heade">
      <div class="goods-left"></div>
      <div class="goods-right">
        Sort by:
        <a class="goods-sort">
          Default
        </a>
        <a class="goods-sort" @click="handlePriceOrderByClick">
          Price
          <svg class="icon icon-arrow-short">
            <use xlink:href="#icon-arrow-short"></use>
          </svg>
        </a>
      </div>
    </section>
    <!-- nav -->
    <section class="goods-body">
      <div class="body-subnav">
        <div class="subnav-title">
          PRICE:
        </div>
        <div class="subnav-between">
          <!-- 价格区间 -->
          <a
            class="b-item"
            v-for="(value, key) in priceLevelList"
            :key="key"
            @click="handlePriceBetween(key)"
            :class="{'active': key === sort.priceLevel}"
          >
            {{ value }}
          </a>
        </div>
      </div>
      <div class="body-list">
        <!-- item -->
        <div class="item" v-for="item in goods" :key="item.productId">
          <div class="item-img">
            <el-image
              style="width: 100%;height: 260px;"
              :src="require(`@/images/${item.productImage}`)"
              :fit="'cover'"
              :lazy="true">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
          <div class="item-cont">
            <div class="cont-name">{{ item.productName }}</div>
            <div class="cont-price">{{ item.salePrice }}</div>
            <div class="cont-button" @click="handleCartAdd(item.productId)">加入购物车</div>
          </div>
        </div>
      </div>
    </section>
    <div class="view-more-normal"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10">
    </div>
  </div>
</template>

<script>
import Api from '@/api/index.api'
const ORDER_BY_ASC = {
  'false': '-1',
  'true': '1'
}
const PRICE_BETWEEN = {
  '0': 'ALL',
  '1': '0.00 - 100.00',
  '2': '100.00 - 500.00',
  '3': '500.00 - 1000.00',
  '4': '1000.00 - 5000.00'
}
export default {
  name: 'Goods',
  data () {
    return {
      goods: [], // 商品列表
      busy: false, // infinite-scroll
      pageSize: 8,
      page: 0,
      stopApiReq: false, // 接口请求是否是空数据
      priceLevelList: PRICE_BETWEEN, // 价格区间
      sort: {
        priceLevel: '0', // 选择的价格区间
        orderBy: true // 升降序
      },
      user: '' // 用户信息
    }
  },
  watch: {
    sort: {
      handler (n) {
        if (n) {
          console.log('sort', n)
          this.goods = []
          this.page = 0
          this.getGoodsList()
        }
      },
      deep: true
    }
  },
  methods: {
    // 加载更多
    loadMore () {
      if (!this.stopApiReq) {
        this.busy = true
        this.getGoodsList()
      }
    },
    // 获取商品信息
    getGoodsList () {
      this.page++
      let param = {
        pageSize: this.pageSize,
        page: this.page,
        orderBy: ORDER_BY_ASC[this.sort.orderBy],
        priceLevel: this.sort.priceLevel
      }
      Api.getGoods(param)
        .then(res => {
          let { response, data } = res
          if (!response.error_code) {
            if (Array.isArray(data) && data.length > 0) {
              this.goods.push(...data)
            }
          } else {
            this.stopApiReq = true
          }
          this.busy = false
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    // 升降序
    handlePriceOrderByClick () {
      this.sort.orderBy = !this.sort.orderBy
    },
    // 价格区间
    handlePriceBetween (key) {
      this.sort.priceLevel = key
    },
    // 添加购物车
    handleCartAdd (pid) {
      if (!this.user) {
        this.$router.push({ path: '/home' })
        return false
      }
      let queryParam = {
        productId: pid,
        userId: this.user.userId
      }
      Api.addCart(queryParam)
        .then(res => {
          let { response } = res
          if (!response.error_code) {
            this.$message({
              message: '添加成功',
              center: true,
              duration: 1 * 1000
            })
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    }
  },
  created () {
    this.user = this.$cookie.get('user') ? JSON.parse(this.$cookie.get('user')) : ''
  }
}
</script>

<style lang="scss" scoped>
.goods{
  width: 100%;
  background-color: rgba(231, 238, 253, 0.6);
  overflow: hidden;
  .goods-heade{
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    background-color: #fff;
    margin-top: 40px;
    .goods-right{
      display: flex;
      .goods-sort{
        margin-left: 10px;
        display: flex;
        align-items: center;
        .icon-arrow-short{
          height: 15px;
          width: 15px;
          margin-left: 10px;
        }
      }
    }
  }
  .goods-body{
    display: flex;
    margin-top: 40px;
    overflow: hidden;
    padding: 0 10px;
    .body-subnav{
      flex-shrink: 0;
      padding: 0 30px;
      min-width: 360px;
      .subnav-title{
        font-weight: 600;
        margin-bottom: 40px;
      }
      .subnav-between{
        display: flex;
        flex-direction: column;
        a.active{
          color: #FCC151;
          border-left: 4px solid #FCC151;
        }
        .b-item{
          margin-top: 14px;
          padding-left: 10px;
          &:hover{
            border-left: 4px solid #FCC151;
          }
        }
      }
    }
    .body-list{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .item{
        flex-shrink: 0;
        width: 24%;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        margin-right: 10px;
        margin-bottom: 16px;
        .item-img{
          margin: 10px;
          img{
            width: 100%;
            height: auto;
          }
        }
        .item-cont{
          padding: 10px;
          .cont-name{
            color: red;
            margin-bottom: 30px;
          }
          .cont-price{
            margin-bottom: 6px;
          }
          .cont-button{
            width: 100%;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: red;
            border: 1px solid red;
          }
        }
      }
    }
  }
  .view-more-normal{
    img{
      width: 25px;
      height: 25px;
    }
  }
}
</style>
