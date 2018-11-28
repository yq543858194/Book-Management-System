<h1>Book Management System</h1>
<p>A library management system based on vue, vue-router, vue-resource, vuex, koa, sequelize and other frameworks</p>
<h3>Run Method</h3>
<p>You can run the project in the following steps</p>
<code>npm install</code><br>
<code>node server/server.js</code><br>
<code>npm run dev</code>
<p>You can configure the database in server/config/config.js,Mysql, redis are recommended</p>
<h3>Problems Encountered</h3>
<dl>
  <dt>Cookie cross domain issues</dt>
  <dd>Problem: Client does not accept cookies from server</dd>
  <dd>
  Solution: You can set <br><code>'Access-Control-Allow-Origin': origin</code><br>
  <code>'Content-Type': 'application/json;charset=utf-8'</code><br>
  <code>'Access-Control-Allow-Credentials': 'true'</code><br>
  in your response headers. And set <br>
  <code>credentials: true</code><br>
  in your resquest header. Origin represents the request host.
  </dd>
</dl>
<h3>Dependencies</h3>
<table>
  <tr>
    <caption>Front End Framework used</cation>
  </tr>
  <tr>
      <td align="center">vue-material-dashboard</td>
      <td align="center">v1.0.1</td>
  </tr>
  <tr>
      <td align="center">vuex</td>
      <td align="center">v3.0.1</td>
  </tr>
  <tr>
      <td align="center">vue-resource</td>
      <td align="center">v1.5.1</td>
  </tr>
  <tr>
      <td align="center">...</td>
      <td align="center">...</td>
  </tr>
</table>
<table>
  <tr>
    <caption>Back End Framework used</cation>
  </tr>
  <tr>
      <td align="center">node.js</td>
      <td align="center">v8.11.2</td>
  </tr>
  <tr>
      <td align="center">koa</td>
      <td align="center">v2.6.2</td>
  </tr>
  <tr>
      <td align="center">sequelize</td>
      <td align="center">v4.41.2</td>
  </tr>
  <tr>
      <td align="center">mysql2</td>
      <td align="center">1.6.4</td>
  </tr>
  <tr>
      <td align="center">redis</td>
      <td align="center">2.8.0</td>
  </tr>
  <tr>
        <td align="center">...</td>
        <td align="center">...</td>
    </tr>
</table>
<h3>Thanks</h3>
<p>Thanks to the authors of these frameworks, I can write such beautiful little programs.</p>
<h3>In Addition</h3>
<p>This is my third grade programming homework, I hope to make better programs after that.</p>
