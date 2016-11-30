/*
 * @ Desc:球球大作战 
 * @ Author:yz
 * @ Date:2016-11-29
 * 
 */

(function () {
    var nimo = {
        data: [
            { "id": "ball_001", "title": "帖子回复", "count": "620", "percent": "30%" },
            { "id": "ball_002", "title": "根回复课数", "count": "124", "percent": "54%" },
            { "id": "ball_003", "title": "错题总数", "count": "112", "percent": "40%" },
            { "id": "ball_004", "title": "与学生互动批作业数", "count": "1243", "percent": "75%" },
            { "id": "ball_005", "title": "微课观看次数", "count": "580", "percent": "100%" },
            { "id": "ball_006", "title": "评级微课次数", "count": "501", "percent": "80%" },
            { "id": "ball_007", "title": "微课收藏次数", "count": "670", "percent": "89%" },
            { "id": "ball_008", "title": "作业修订数", "count": "152", "percent": "70%" },
            { "id": "ball_009", "title": "微课观看个数", "count": "1742", "percent": "45%" },
            { "id": "ball_010", "title": "帖子中交互人数", "count": "985", "percent": "80%" },
            { "id": "ball_011", "title": "通知回复数", "count": "1120", "percent": "76%" },
            { "id": "ball_012", "title": "非根回复微课数", "count": "540", "percent": "50%" },
            { "id": "ball_013", "title": "访问别人次数", "count": "230", "percent": "50%" },
            { "id": "ball_014", "title": "发给老师私信书", "count": "98", "percent": "60%" },
            { "id": "ball_015", "title": "访问别人数", "count": "210", "percent": "51%" },
            { "id": "ball_016", "title": "社区发帖数", "count": "78", "percent": "44%" },
            { "id": "ball_017", "title": "微课点赞数", "count": "998", "percent": "45%" },
            { "id": "ball_018", "title": "非微课点赞数", "count": "128", "percent": "52%" },
            { "id": "ball_019", "title": "递交作业数", "count": "430", "percent": "34%" },
            { "id": "ball_020", "title": "评级非微课次数", "count": "530", "percent": "33%" },
        ],
        resultBall: []
        ,
        obj: {
            dia: 500,         //原球（外球）大小
            max: 100,        //内球最大数
            temp: 3         //球球之间间距

        },
        fn: {

            /* 初始化 */
            init: function () {

                nimo.fn.Config();

                nimo.fn.getBallInfo();

                nimo.fn.createBalls();

            },

            /* 创建球球 */
            createBalls: function () {

                var _balls = nimo.resultBall

                if (_balls.length > 0) {

                    $.each(_balls, function (i, v) {

                        $("#OriginalBall").append($('<div id="' + v.id
                            + '" style="height:' + v.dia
                            + 'px; width:' + v.dia
                            + 'px; border-radius:' + v.dia / 2
                            + 'px; background-color:' + v.color
                            + '; top:' + (v.top - v.dia / 2)
                            + 'px; left:' + (v.left - v.dia / 2)
                            + 'px;"><span>' + v.title
                            + '</span></div>'));

                    });

                    /* 小球拖动 */
                    $("#OriginalBall div").mouseover(function () {
                        debugger;
                        var divid = $(this).attr("id"); //获取当前div的id

                        var odiv = document.getElementById(divid); //得到当前div

                        $(this).css("z-index", "100").siblings().css("z-index", "0"); //div层叠顺序

                        $(this).addClass("pointer"); //初始化指针样式

                        nimo.fn.moveDiv(odiv);

                    });
                }
            },

            /* 1.获取球球数据 */
            getBallInfo: function () {
                var data = nimo.data;

                $.each(data, function (i, v) {
                    var _dia = parseInt(v.percent) / 100 * nimo.obj.max;    //直径
                    var _color = nimo.fn.getColer();          //颜色

                    /* 随机生成可用坐标 */
                    var _x, _y;
                    do {
                        _x = nimo.obj.dia * Math.random();
                        _y = nimo.obj.dia * Math.random();

                        var calX = nimo.obj.dia / 2 - (_x);
                        var calY = nimo.obj.dia / 2 - (_y);

                        //计算两球之间距离
                        var _long = Math.pow((calX * calX + calY * calY), 0.5);

                    } while (nimo.fn.isIntersectant(_x, _y, _dia, _long));

                    nimo.resultBall.push({
                        "id": v.id,
                        "title": v.title,
                        "count": v.count,
                        "percent": v.percent,
                        "dia": _dia,
                        "color": _color,
                        "top": _y,
                        "left": _x,
                    });

                });

            },

            /* 判断是否与其他球球相交 */
            isIntersectant: function () {
                var _x = arguments[0];
                var _y = arguments[1];
                var _dia = arguments[2];
                var _long1 = arguments[3];

                var bool = false;

                //新小球不与已创建小球相交
                $.each(nimo.resultBall, function (i, v) {

                    var calX = (v.left) - (_x);
                    var calY = (v.top) - (_y);

                    //计算两球之间距离
                    var _long = Math.pow((calX * calX + calY * calY), 0.5);

                    if (_long < (v.dia / 2 + _dia / 2 + nimo.obj.temp)) {
                        bool = true;
                        return;
                    }

                });

                // 此处判断生成的小球在规定范围内&&新小球的不与其他小球相交
                if (_long1 + _dia / 2 < nimo.obj.dia / 2 && bool == false) {
                    return false;
                } else {
                    return true;
                }
            },

            /* 获取随机颜色 */
            getColer: function () {

                var aRandomColor = [];
                aRandomColor.push(nimo.fn.creatRandom(0, 255));
                aRandomColor.push(nimo.fn.creatRandom(0, 255));
                aRandomColor.push(nimo.fn.creatRandom(0, 255));

                return 'rgba(' + aRandomColor[0] + ',' + aRandomColor[1] + ',' + aRandomColor[2] + ',0.5)';
            },

            /* 生产随机数 */
            creatRandom: function () {
                var iResult;
                iResult = arguments[0] + (Math.floor(Math.random() * (arguments[1] - arguments[0] + 1)));
                return iResult
            },

            /* 小球移动 */
            moveDiv: function (obj) {

                obj.onmousedown = function (e) {

                    var oe = e || window.event;

                    var $this = this;

                    var startX = oe.clientX - $this.offsetLeft;

                    var startY = oe.clientY - $this.offsetTop;

                    obj.className = "on"; //css3阴影样式添加

                    document.onmousemove = function (e) {//鼠标移动事件

                        var oe = e || window.event;

                        $this.style.left = oe.clientX - startX + "px";

                        $this.style.top = oe.clientY - startY + "px";
                    }

                    document.onmouseup = function () {//鼠标松开事件

                        document.onmousemove = null;

                        document.onmouseup = null;

                        obj.className = "off"; //css3阴影样式去除

                        if ($this.releaseCapture) {//debug释放鼠标捕获

                            $this.releaseCapture();
                        }
                    }

                    if ($this.setCapture) {//debug设置鼠标捕获

                        $this.setCapture();
                    }
                    return false;
                }
            },

            /* 配置 */
            Config: function () {

                /* 设置原球 */
                $("#OriginalBall").css({ "width": nimo.obj.dia, "height": nimo.obj.dia, "border-radius": nimo.obj.dia / 2 })


            }

        }
    };

    $(function () {

        nimo.fn.init();

    });

})()
