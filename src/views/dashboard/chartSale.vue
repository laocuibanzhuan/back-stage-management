<template>
  <el-card>
    <div class="main">
      <div class="left">
        <el-tabs>
          <el-tab-pane label="销售额">
            <div class="charts" ref="chart1"></div>
          </el-tab-pane>
          <el-tab-pane label="访问量">
            <div class="charts" ref="chart2"></div>
          </el-tab-pane>
        </el-tabs>
      </div>

      <div class="right">
        <el-date-picker
          size="mini"
          v-model="dateValue"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        >
        </el-date-picker>
        <div class="showList">
          <h3>门店排名</h3>
          <ul>
            <li>
              <span class="rindex">1</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span class="rindex">2</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span class="rindex">3</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span>4</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span>5</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span>6</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span>7</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      dateValue: "",
    };
  },
  mounted() {
    let charts1 = echarts.init(this.$refs.chart1);
    charts1.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220],
        },
      ],
    });
    let charts2 = echarts.init(this.$refs.chart2);
    charts2.setOption({
      tooltip: {
        trigger: "axis",
      },
      xAxis: [
        {
          type: "category",
          data: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Rainfall",
          type: "bar",
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
          markPoint: {
            data: [
              { type: "max", name: "Max" },
              { type: "min", name: "Min" },
            ],
          },
          markLine: {
            data: [{ type: "average", name: "Avg" }],
          },
        },
        {
          name: "Evaporation",
          type: "bar",
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
          markPoint: {
            data: [
              { name: "Max", value: 182.2, xAxis: 7, yAxis: 183 },
              { name: "Min", value: 2.3, xAxis: 11, yAxis: 3 },
            ],
          },
          markLine: {
            data: [{ type: "average", name: "Avg" }],
          },
        },
      ],
    });
  },
};
</script>

<style scoped>
.left {
  width: 48vw;
}
.charts {
  width: 48vw;
  height: 30vh;
}
.el-card {
  margin-top: 10px;
}
.main {
  display: flex;
  justify-content: space-between;
}
.showList {
  margin: 20px;
  font-size: 18px;
}

ul {
  padding-left: 30px;
  list-style: none;
}
ul li {
  height: 8%;
  margin: 10px 0px;
}
ul li span:nth-child(1) {
  float: left;
  width: 20px;
  height: 20px;
  text-align: center;
}
ul li span:nth-child(2) {
  margin-left: 25px;
}
.rindex {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgb(145, 25, 25);
  color: white;
  text-align: center;
}
.rvalue {
  float: right;
  margin-right: 50px;
}
</style>
