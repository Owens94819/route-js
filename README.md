
# RouteJs
```js
/*JavaScript*/
RouteJs.extend(Object) //Object
RouteJs.fetch(Url, Boolean) //Object

var app=new RouteJs(Name, Options)

app.map(Name, String || Promise || NodeList || Element || Node || app.useTemplate || app.usePromise)

app.mapAll(Options)

app.useTemplate(HTMLTemplateElement || Element, Boolean)

app.usePromise(Promise, String || NodeList || Element || Node || app.useTemplate || app.usePromise)

app.createNodeList(String)

```

  
```html
<!--HTML-->

<?A:B C?>

<!-- or -->

<div route="A:B C"></div>

```
`A = Route name`
`B = Map name`
`C = placeholder(value to be displayed before B loads) or events`


```html
<!--HTML-->

<?A:B {
    onload(resolve, NEWSibling, OLDSibling) {
        console.log('loaded')
    },
    onloadstart(resolve, NEWSibling, OLDSibling) {
        console.log('loadstart')
    },
    onloadend(resolve, NEWSibling, OLDSibling) {
        console.log('loadend')
    },
    placeholder: "a placeholder for B"
    }?>

    <!-- or -->

<div route="A:B {
    onload(resolve, NEWSibling, OLDSibling) {
        console.log('loaded')
    },
    onloadstart(resolve, NEWSibling, OLDSibling) {
        console.log('loadstart')
    },
    onloadend(resolve, NEWSibling, OLDSibling) {
        console.log('loadend')
    },
    placeholder: "a placeholder for B"
    }"></div>
```


```javascript
    /*JavaScript*/
    app_events= {
    onload(resolve, NEWSibling, OLDSibling) {
        console.log('loaded')
    },
    onloadstart(resolve, NEWSibling, OLDSibling) {
        console.log('loadstart')
    },
    onloadend(resolve, NEWSibling, OLDSibling) {
        console.log('loadend')
    },
    placeholder: "a placeholder for B"
    }
```

```html
<!--HTML-->
<?A:B {app_events}?>

<!-- or -->
<div route="A:B {app_events}"></div>
```

# Examples
 `javascript`
 ```js
  var app =new RouteJs('app',{
      name:'Word'
  })
  console.log(app)
 ```

 `html`
```html
<!DOCTYPE html>
<html>
    <head>
        <script src="script.js"></script>
        <script>...</script>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="">
    </head>
    <body>
        Hello <?app:name?>
    </body>
</html>
```

`preview`
```plain
Hello Word
```
----
 `javascript`
 ```js
  app.map('name','App')
 ```

 `preview`
```preview
Hello App
```

# Examples
[using template](https://owens94819.github.io/route-js/) | 
[list styling](https://owens94819.github.io/route-js/examples/list.html)