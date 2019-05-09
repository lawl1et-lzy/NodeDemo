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
        <a class="goods-sort">
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
          <a class="b-item">
            ALL
          </a>
          <a class="b-item">
            0.00 - 100.00
          </a>
          <a class="b-item">
            100.00 - 200.00
          </a>
        </div>
      </div>
      <div class="body-list">
        <!-- item -->
        <div class="item" v-for="(item, index) in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]" :key="index">
          <div class="item-img">
            <el-image
              style="width: 100%;height: 260px;"
              :src="require(`@/images/${item}.jpg`)"
              :fit="'cover'"
              :lazy="true">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
          <div class="item-cont">
            <div class="cont-name">自拍杆</div>
            <div class="cont-price">39</div>
            <div class="cont-button">加入购物车</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Goods'
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
        width: calc(25% - 20px);
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        margin: 0 20px 20px 0;
        &:last-child{
          margin-right: 0;
        }
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
}
</style>
