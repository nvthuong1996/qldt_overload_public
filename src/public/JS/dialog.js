var nameUL = "";
var nameToogle = "";
var stateClickDropDown = 2;
var currentWidthScreen = 0;
var CurrentMenuID = "";

function GetValueControl(nameCtrl, iscontent) {
    var ctrl = $("#" + nameCtrl);
    if (iscontent == true) {
        return ctrl.data("content");
    }
    else return ctrl.val();
}

function ShowDialog(mess, size, typeShow) {
    if (typeShow == "danger")
        typeShow = "glyphicon glyphicon-alert";
    else if (typeShow == "warning")
        typeShow = "glyphicon glyphicon-alert";
    DialogShow.show(mess, { dialogSize: size, progressType: typeShow });
}

function ShowDialogErrorConfirm(mess, methodName, idClick, size, typeShow) {
    if (typeShow == "danger")
        typeShow = "glyphicon glyphicon-warning";
    else if (typeShow == "warning")
        typeShow = "glyphicon glyphicon-alert";
    DialogShowConfirm.show(mess, methodName, idClick, { dialogSize: size, progressType: typeShow });
}
function HideWaitingForm() {
    waitingDialog.hide();
}
function ShowWaittingSmallInfo(tieude) {
    waitingDialog.show(tieude, { dialogSize: 'sm', progressType: '' });
}
function ShowWaittingSmallWarning(tieude) {
    waitingDialog.show(tieude, { dialogSize: 'sm', progressType: 'warning' });
}
function ShowWaittingNormalWarning(tieude) {
    waitingDialog.show(tieude, { dialogSize: 'm', progressType: 'warning' });
}
function ShowWaittingNormalInfo(tieude) {
    waitingDialog.show(tieude, { dialogSize: 'm', progressType: 'success' });
}
(function ($) {
    $('.spinner .btn:first-of-type').on('click', function () {
        $('.spinner input').val(parseInt($('.spinner input').val(), 10) + 1);
    });
    $('.spinner .btn:last-of-type').on('click', function () {
        $('.spinner input').val(parseInt($('.spinner input').val(), 10) - 1);
    });
})(jQuery);
function ClickConfirmDialog(values) {
    $('#btnOKDialog').data("content", values);
    var args = new Array();
    args.push(values);
    var methodName = DialogShowConfirm.MethodName();
    var idCtrlChecked = DialogShowConfirm.IDClick();
    args.push(idCtrlChecked);
    DialogShowConfirm.hide();
    if (methodName != null && methodName != "")
        window[methodName].apply(this, args);
}

var DialogShowConfirm = (function ($) {
    var methodName = "";
    var idClick = "";
    var $dialogconfirm = $(
		'<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">' +
		'<div class="modal-dialog modal-m">' +
		'<div class="modal-content">' +
			'<div class="modal-header"><h4 class="modal-tilte custom-align" style="margin:0;">Thông báo</h4></div>' +
			'<div class="modal-body">' +
				'<div style="margin-bottom:0;width:100%"><label style="width:100%;height:30px;vertical-align:middle" class="alert alert-danger"></label></div>' +
			'</div>' +
            '<div class="modal-footer"><button type="button" onclick="ClickConfirmDialog(1)" id="btnOKDialog" class="btn btn-success"><span class="glyphicon glyphicon-ok-sign"></span> Tiếp tục</button>' +
            '<button type="button" class="btn btn-default" onclick="ClickConfirmDialog(0)"><span class="glyphicon glyphicon-remove"></span> Ngưng</button></div>' +
            '</div></div></div>');

    return {

        MethodName: function () {
            return methodName;
        },
        IDClick: function () {
            return idClick;
        },
        show: function (message, methoaAfterClickApply, _idClick, options) {
            // Assigning defaults
            var settings = $.extend({
                dialogSize: 'm',
                progressType: ''
            }, options);
            if (typeof message === 'undefined') {
                message = 'Loading';
            }
            if (typeof options === 'undefined') {
                options = {};
            }
            $dialogconfirm.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
            //if (settings.progressType)
            //{
            //    $dialogconfirm.find('span').prop("class", settings.progressType);
            //}
            $dialogconfirm.find('label').prop("innerHTML", " " + message);
            methodName = methoaAfterClickApply;
            idClick = _idClick;
            $dialogconfirm.modal();
        },
        /**
		 * Closes dialog
		 */
        hide: function () {
            $dialogconfirm.modal('hide');
        }
    }

})(jQuery);

var DialogShow = (function ($) {
    // Creating modal dialog's DOM
    var $dialog = $(
		'<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="overflow-y:visible;">' +
		'<div class="modal-dialog modal-m">' +
		'<div class="modal-content">' +
			'<div class="modal-header"><h4 class="modal-tilte custom-align" style="margin:0;">Thông báo</h4></div>' +
			'<div class="modal-body">' +
				'<div style="margin-bottom:0;"><i></i> <label></label></div>' +
			'</div>' +
             '<div class="modal-footer"><button type="button"  class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Đóng</button></div>' +
		'</div></div></div>');


    return {
        /**
		 * Opens our dialog
		 * @param message Custom message
		 * @param options Custom options:
		 * 				  options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
		 * 				  options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
		 */
        result: function () {

        },
        show: function (message, options) {
            // Assigning defaults
            var settings = $.extend({
                dialogSize: 'm',
                progressType: ''
            }, options);
            if (typeof message === 'undefined') {
                message = 'Loading';
            }
            if (typeof options === 'undefined') {
                options = {};
            }
            // Configuring dialog
            $dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
            if (settings.progressType) {
                $dialog.find('i').prop("class", settings.progressType);
            }
            $dialog.find('label').prop("innerHTML", message);
            $dialog.modal();
        },
        /**
		 * Closes dialog
		 */
        hide: function () {
            $dialog.modal('hide');
        }
    }

})(jQuery);



//WAITING SHOW
//==============================
var waitingDialog = (function ($) {

    // Creating modal dialog's DOM
    var $dialog = $(
		'<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">' +
		'<div class="modal-dialog modal-m">' +
		'<div class="modal-content">' +
			'<div class="modal-header"><h5 style="margin:0;"></h5></div>' +
			'<div class="modal-body">' +
				'<div class="progress progress-striped active" style="margin-bottom:0;"><div class="progress-bar" style="width: 100%"></div></div>' +
			'</div>' +
		'</div></div></div>');

    return {
        /**
		 * Opens our dialog
		 * @param message Custom message
		 * @param options Custom options:
		 * 				  options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
		 * 				  options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
		 */
        show: function (message, options) {
            // Assigning defaults
            var settings = $.extend({
                dialogSize: 'm',
                progressType: ''
            }, options);
            if (typeof message === 'undefined') {
                message = 'Loading';
            }
            if (typeof options === 'undefined') {
                options = {};
            }
            // Configuring dialog
            $dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
            $dialog.find('.progress-bar').attr('class', 'progress-bar');
            if (settings.progressType) {
                $dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
            }
            $dialog.find('h5').text(message);
            // Opening dialog
            $dialog.modal();
        },
        /**
		 * Closes dialog
		 */
        hide: function () {
            $dialog.modal('hide');
        }
    }

})(jQuery);

// XU LY CONTROL EDIT
function KeyDowMoveInput(s, event, index) {
    if (event.keyCode == 13) {
        $('[data-index="' + (index + 1).toString() + '"]').focus();
    }
}

//XỬ LÝ VIEW
