//显示图片
function formatImg(val,row){
    var url;
    if(row.poster){
        url = row.poster;
    }else {
        url=row.bposter;
    }
    if(!url){
        url = "/1.png"
    }
    return "<img width='20px' height='20px' src="+"http://175.6.223.37"+url+" onclick='showImg(\""+"http://175.6.223.37"+url+"\")'/>"
}

//加载操作
function formatSubmit(value, data, index) {
    var op = '';
    if (data.prod_vid == data.test_vid) {
        op += "<span style='color:mediumblue'><img style='vertical-align: middle' src='" + ctxPath + "/images/submit.png'/>已提交</span>";
    } else {
        var vid = data.link_vid ? data.link_vid : data.vid;
        op += "<a style='color:red;text-decoration: underline;' href='javascript:void(0);' onclick='submitPro(\"" + data.rid + "\",\"" + vid + "\")'>" +
            "<img style='vertical-align: middle' src='" + ctxPath + "static/img/unsubmit.png'/>提交</a>";
    }
    if (data.free) {
        op += "&nbsp;&nbsp;&nbsp;&nbsp;<a style='color:mediumblue;text-decoration: underline;cursor: pointer;' onclick='changefreeStatus(\"" + data.rid + "\",\"" + data.free + "\")'>标记为收费</a>";
    } else {
        op += "&nbsp;&nbsp;&nbsp;&nbsp;<a style='color:red;text-decoration: underline;cursor: pointer;' onclick='changefreeStatus(\"" + data.rid + "\",\"" + data.free + "\")'>标记为免费</a>";
    }

    return op;
}

function pagerFilter(data){
    if (typeof data.length == 'number' && typeof data.splice == 'function'){	// is array
        data = {
            total: data.length,
            rows: data
        }
    }
    var dg = $(this);
    var opts = dg.datagrid('options');
    var pager = dg.datagrid('getPager');
    pager.pagination({
        onSelectPage:function(pageNum, pageSize){
            opts.pageNumber = pageNum;
            opts.pageSize = pageSize;
            pager.pagination('refresh',{
                pageNumber:pageNum,
                pageSize:pageSize
            });
            dg.datagrid('loadData',data);
        }
    });
    if (!data.originalRows){
        data.originalRows = (data.rows);
    }
    var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
    var end = start + parseInt(opts.pageSize);
    data.rows = (data.originalRows.slice(start, end));
    return data;
}
