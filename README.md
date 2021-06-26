# 環境建置與需求 (prerequisites)
* Node.js
* express
* express-handlebars
* body-parser
* method-override
* mongoose

# 安裝與執行步驟 (installation and execution)

* 將專案安裝至本機
```
git clone https://github.com/a1234567045/expense-tracker-upgrade.git
```
* 進入專案資料夾
```
cd expense-tracker-upgrade
```
* npm 安裝環境需求套件
express
express-handlebars
body-parser
method-override
mongoose
* 用 nodemon 執行 app.js
```
nodemon app.js
```
* 用 npm 執行 seed
```
npm run seed
```
# 功能描述 (features)

* 在首頁一次瀏覽所有支出
* 在首頁看到所有支出的總金額
* 新增一筆支出
* 編輯單筆支出的所有屬性
* 刪除任何單筆支出
* 在首頁可以根據支出「類別」篩選支出，並計算該類別的支出總額
* 新增使用者認證功能
* 使用者可以在每筆支出加上「商家 (merchant)」這個欄位
* 在首頁，使用者可以同時根據「類別」與「月份」來篩選支出；總金額的計算只會包括被篩選出來的支出總和