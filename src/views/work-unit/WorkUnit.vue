<template>
  <div class="work-unit">
    <h1>UNIT MANAGEMENT</h1>
    <table>
      <thead>
        <tr>
          <th>organizational unit name</th>
          <th>organizational unit code</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Item</td>
          <td>Item</td>
          <td>Item</td>
        </tr>
        <tr>
          <td>Item</td>
          <td>Item</td>
          <td>Item</td>
        </tr>
        <tr>
          <td>Item</td>
          <td>Item</td>
          <td>Item</td>
        </tr>
        <tr>
          <td>Item</td>
          <td>Item</td>
          <td>Item</td>
        </tr>
        <tr>
          <td>Item</td>
          <td>Item</td>
          <td>Item</td>
        </tr>
        <tr>
          <td>Item</td>
          <td>Item</td>
          <td>Item</td>
        </tr>
        <tr>
          <td>Item</td>
          <td>Item</td>
          <td>Item</td>
        </tr>
        <tr>
          <td>Item</td>
          <td>Item</td>
          <td>Item</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.work-unit {
  width: 100%;
  margin: 100px auto;
  text-align: center;
}
table {
  width: 80%;
  background-color: #fff;
  font-family: "Arial";
  margin: 25px auto;
  border-collapse: collapse;
  border: 1px solid #eee;
  border-bottom: 2px solid #00cccc;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1), 0px 10px 20px rgba(0, 0, 0, 0.05),
    0px 20px 20px rgba(0, 0, 0, 0.05), 0px 30px 20px rgba(0, 0, 0, 0.05);
  tr {
    &:hover {
      background: #f4f4f4;

      td {
        color: #555;
      }
    }
  }
  th,
  td {
    color: #999;
    border: 1px solid #eee;
    padding: 12px 35px;
    border-collapse: collapse;
  }
  th {
    background: #00cccc;
    color: #fff;
    text-transform: uppercase;
    font-size: 12px;
    &.last {
      border-right: none;
    }
  }
}
</style>
