require([
	'jquery',
	'Vue',
	'vendor/common.js',
	'plugins/layer/layer.js',
], function($, Vue, common, layer) {


	function task(){
		common.globalAjax({
			action: 'Incentive.incentiveIndex',
			done: function(res) {
				var tipsPadding = $(window).width()*0.027;//提示框的内边距宽度
				var progressW = $(window).width() * 0.72;//进度条宽度
				//周任务
				if(parseInt(res.data.info.is_new_agency) == 0){
					var weekProgressVal = parseInt(res.data.info.week_task.current_order_count);;//周订单数
				}else{
					var weekProgressVal = 0;
				}
				var week_tiduNum_length = parseInt(res.data.info.week_task.rule.length);
				//判断任务数大于3个时
				if(week_tiduNum_length>3){
					var week_task = res.data.info.week_task.rule;
					var new_i = 0;
					for (i in week_task) {
						if (weekProgressVal>=week_task[i].man) {
							new_i = i;
						}
					}
					if(week_tiduNum_length==4){
						switch(parseInt(new_i)) {
							case 0:
								var week_task_arr = week_task.slice(0, 3);
								break;
							case 1:
								var week_task_arr = week_task.slice(0, 3);
								break;
							case 2:
								var week_task_arr = week_task.slice(1, 4);
								break;
							case 3:
								var week_task_arr = week_task.slice(1, 4);
								break;
						}
					}
					if(week_tiduNum_length==5){
						switch(parseInt(new_i)) {
							case 0:
								var week_task_arr = week_task.slice(0, 3);
								break;
							case 1:
								var week_task_arr = week_task.slice(0, 3);
								break;
							case 2:
								var week_task_arr = week_task.slice(1, 4);
								break;
							case 3:
								var week_task_arr = week_task.slice(2, 5);
								break;
							case 4:
								var week_task_arr = week_task.slice(2, 5);
								break;
						}
					}
					if(week_tiduNum_length==6){
						switch(parseInt(new_i)) {
							case 0:
								var week_task_arr = week_task.slice(0, 3);
								break;
							case 1:
								var week_task_arr = week_task.slice(0, 3);
								break;
							case 2:
								var week_task_arr = week_task.slice(1, 4);
								break;
							case 3:
								var week_task_arr = week_task.slice(2, 5);
								break;
							case 4:
								var week_task_arr = week_task.slice(3, 6);
								break;
							case 5:
								var week_task_arr = week_task.slice(3, 6);
								break;
						}
					}
					reward.$set('week_task', week_task_arr);
					var week_length = 3;
				}
				if(week_tiduNum_length == 1){
					var week_tiduNum_1 = parseInt(res.data.info.week_task.rule[0].man);
				}else if(week_tiduNum_length == 2){
					var week_tiduNum_1 = parseInt(res.data.info.week_task.rule[0].man);
					var week_tiduNum_2 = parseInt(res.data.info.week_task.rule[1].man);
				}else if(week_tiduNum_length == 3){
					var week_tiduNum_1 = parseInt(res.data.info.week_task.rule[0].man);
					var week_tiduNum_2 = parseInt(res.data.info.week_task.rule[1].man);
					var week_tiduNum_3 = parseInt(res.data.info.week_task.rule[2].man);
				}else if(week_tiduNum_length > 3){
					var week_tiduNum_1 = parseInt(week_task_arr[0].man);
					var week_tiduNum_2 = parseInt(week_task_arr[1].man);
					var week_tiduNum_3 = parseInt(week_task_arr[2].man);
				}
				var week_interval = setInterval(week_increment,50);//数值动画
				var week_current = 0;//初始
				function week_increment(){//周数值动画主方法
					week_current = week_current + 1;
					if(week_current >= weekProgressVal){//处理数字累加到传给的值时停止
						clearInterval(week_interval);
						week_current = weekProgressVal;
					}
					if(week_tiduNum_length == 1){
						switch(week_current) {
							case 0:
								$('.week .reward-tips').html('<span><em></em>小主，你还没有开始行动哦~</span>');
								$('.week .reward-tips span').show('500');
								$(".week .reward-progress progress").attr('value', '0');
								break;
							case week_tiduNum_1:
								$('.week .reward-progress span:first-child,.week ul li:first-child').addClass('active');
								$('.week .reward-tips').html('<span><em></em>任务完成，腻害！已赚<b>'+res.data.info.week_task.rule[0].jiang+'</b>元！</span>');
								var tipsW = $('.week .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
								var newPro = (progressW-tipsW)*0.5;
								var marEm = tipsW*(1/2)+(tipsW+tipsPadding)*0.08;
								$('.week .reward-tips span em').css('left', marEm+'px');
								var newLeft = newPro-newTips;
								$(".week .reward-progress progress").attr('value', '15');
								$('.week .reward-tips span').css('margin-left', newLeft+'px');
								$('.week .reward-tips span').show('500');
								break;
							default:
								if(week_current>week_tiduNum_1){
									$('.week .reward-tips').html('<span><em></em>本周超额完成！月任务加油喔！</span>');
								}else{
									$('.week .reward-tips').html('<span><em></em>你已完成<b>'+week_current+'</b>单，加油哦~</span>');
								}
								var tipsW = $('.week .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
								if(0<week_current && week_current<week_tiduNum_1){
									$(".week .reward-progress progress").attr('value', '7.5');
									var newPro = progressW*(1/((week_tiduNum_length+1)*2));
									var newLeft = newPro-newTips;
									$('.week .reward-tips span').css('margin-left', newLeft+'px');
								}else if(week_current>week_tiduNum_1){
									$('.week .reward-tips span').css({
										'position': 'absolute',
										'right': '0'
									});
									var newPro = progressW*(1/((week_tiduNum_length+1)*2));
									var tipsRight = newPro-newTips;
									$('.week .reward-tips span em').css({
											'left': 'auto',
											'right': tipsRight+'px'
										});
									$(".week .reward-progress progress").attr('value', '30');
								}
								$('.week .reward-tips span').show('500');
						}
					}else if(week_tiduNum_length == 2){
						switch(week_current) {
							case 0:
								$('.week .reward-tips').html('<span><em></em>小主，你还没有开始行动哦~</span>');
								$('.week .reward-tips span').show('500');
								$(".week .reward-progress progress").attr('value', '0');
								break;
							case week_tiduNum_1:
								$('.week .reward-progress span:first-child,.week ul li:first-child').addClass('active');
								$('.week .reward-tips').html('<span><em></em>任务完成，腻害！已赚<b>'+res.data.info.week_task.rule[0].jiang+'</b>元！</span>');
								var tipsW = $('.week .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
								var newPro = progressW*(1/(week_tiduNum_length+1));
								var newLeft = newPro-newTips;
								$('.week .reward-tips span').css('margin-left', newLeft+'px');
								$('.week .reward-tips span').show('500');
								$(".week .reward-progress progress").attr('value', '10');
								break;
							case week_tiduNum_2:
								$('.week .reward-progress span:nth-child(2),.week ul li:nth-child(2)').addClass('active');
								$('.week .reward-tips').html('<span><em></em>任务完成，腻害！已赚<b>'+res.data.info.week_task.rule[1].jiang+'</b>元！</span>');
								var tipsW = $('.week .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08 - $(window).width()*0.014;
								if(progressW<900){
									var newPro = progressW*(1/(week_tiduNum_length+1)) - newTips;
									$('.week .reward-tips span').css({
										'position': 'absolute',
										'right': newPro+'px'
									});
									$('.week .reward-tips span em').css({
										'position': 'absolute',
										'left': '92%'
									});
								}else{
									var newPro = progressW*(2/3);
									var newLeft = newPro-newTips;
									$('.week .reward-tips span').css('margin-left', newPro+'px');
								}
								$('.week .reward-tips span').show('500');
								$(".week .reward-progress progress").attr('value', '20');
								break;
							default:
								if(week_current>week_tiduNum_2){
									$('.week .reward-tips').html('<span><em></em>本周超额完成！月任务加油喔！</span>');
								}else{
									$('.week .reward-tips').html('<span><em></em>你已完成<b>'+week_current+'</b>单，加油哦~</span>');
								}
								var tipsW = $('.week .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
								if(0<week_current && week_current<week_tiduNum_1){
									$(".week .reward-progress progress").attr('value', '5');
									var newPro = progressW*(1/((week_tiduNum_length+1)*2));
									var newLeft = newPro-newTips;
									$('.week .reward-tips span').css('margin-left', newLeft+'px');
								}else if(week_tiduNum_1<week_current && week_current<week_tiduNum_2){
									if(progressW<480){
										var newPro = progressW*(1/(week_tiduNum_length+1));
										var marEm = progressW*(1/((week_tiduNum_length+1)*2))+(tipsW+tipsPadding)*0.08;
										$('.week .reward-tips span em').css('left', marEm+'px');
									}else{
										var newPro = progressW*((week_tiduNum_length+1)/((week_tiduNum_length+1)*2));
									}
									var newLeft = newPro-newTips;
									$(".week .reward-progress progress").attr('value', '15');
									$('.week .reward-tips span').css('margin-left', newLeft+'px');
								}else if(week_current>week_tiduNum_2){
									$('.week .reward-tips span').css({
										'position': 'absolute',
										'right': '0'
									});
									var newPro = progressW*(1/((week_tiduNum_length+1)*2));
									var tipsRight = newPro-newTips;
									$('.week .reward-tips span em').css({
											'left': 'auto',
											'right': tipsRight+'px'
										});
									$(".week .reward-progress progress").attr('value', '30');
								}
								$('.week .reward-tips span').show('500');
						}
					}else if(week_tiduNum_length == 3 || week_length == 3){
						switch(week_current) {
							case 0:
								$('.week .reward-tips').html('<span><em></em>小主，你还没有开始行动哦~</span>');
								$('.week .reward-tips span').show('500');
								$(".week .reward-progress progress").attr('value', '0');
								break;
							case week_tiduNum_1:
								$('.week .reward-progress span:first-child,.week ul li:first-child').addClass('active');
								$('.week .reward-tips').html('<span><em></em>任务完成，腻害！已赚<b>'+res.data.info.week_task.rule[0].jiang+'</b>元！</span>');
								var tipsW = $('.week .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
								var newPro = progressW*(1/(week_tiduNum_length+1));
								var newLeft = newPro-newTips;
								$('.week .reward-tips span').css('margin-left', newLeft+'px');
								$('.week .reward-tips span').show('500');
								$(".week .reward-progress progress").attr('value', '7.5');
								break;
							case week_tiduNum_2:
								$('.week .reward-progress span:nth-child(2),.week ul li:nth-child(2)').addClass('active');
								$('.week .reward-tips').html('<span><em></em>任务完成，腻害！已赚<b>'+res.data.info.week_task.rule[1].jiang+'</b>元！</span>');
								var tipsW = $('.week .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
								var newPro = (progressW-tipsW)*0.5;
								var marEm = tipsW*(1/2)+(tipsW+tipsPadding)*0.08;
								$('.week .reward-tips span em').css('left', marEm+'px');
								var newLeft = newPro-newTips;
								$(".week .reward-progress progress").attr('value', '15');
								$('.week .reward-tips span').css('margin-left', newLeft+'px');
								$('.week .reward-tips span').show('500');
								break;
							case week_tiduNum_3:
								$('.week .reward-progress span:nth-child(3),.week ul li:nth-child(3)').addClass('active');
								$('.week .reward-tips').html('<span><em></em>任务完成，腻害！已赚<b>'+res.data.info.week_task.rule[2].jiang+'</b>元！</span>');
								var tipsW = $('.week .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08 - $(window).width()*0.014;
								if(progressW<900){
									var newPro = progressW*(1/(week_tiduNum_length+1)) - newTips;
									$('.week .reward-tips span').css({
										'position': 'absolute',
										'right': newPro+'px'
									});
									$('.week .reward-tips span em').css({
										'position': 'absolute',
										'left': '92%'
									});
								}else{
									var newPro = progressW*(2/3);
									var newLeft = newPro-newTips;
									$('.week .reward-tips span').css('margin-left', newPro+'px');
								}
								$('.week .reward-tips span').show('500');
								$(".week .reward-progress progress").attr('value', '22.5');
								break;
							default:
								if(week_current>week_tiduNum_3){
									$('.week .reward-tips').html('<span><em></em>本周超额完成！月任务加油喔！</span>');
								}else{
									$('.week .reward-tips').html('<span><em></em>你已完成<b>'+week_current+'</b>单，加油哦~</span>');
								}
								var tipsW = $('.week .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
								if(0<week_current && week_current<week_tiduNum_1){
									$(".week .reward-progress progress").attr('value', '3.75');
									var newPro = progressW*(1/((week_tiduNum_length+1)*2));
									var newLeft = newPro-newTips;
									$('.week .reward-tips span').css('margin-left', newLeft+'px');
								}else if(week_tiduNum_1<week_current && week_current<week_tiduNum_2){
									if(progressW<900){
										var newPro = progressW*(1/(week_tiduNum_length+1));
										var marEm = progressW*(1/((week_tiduNum_length+1)*2))+(tipsW+tipsPadding)*0.08;
										$('.week .reward-tips span em').css('left', marEm+'px');
									}else{
										var newPro = progressW*((week_tiduNum_length+1)/((week_tiduNum_length+1)*2));
									}
									var newLeft = newPro-newTips;
									$(".week .reward-progress progress").attr('value', '11.25');
									$('.week .reward-tips span').css('margin-left', newLeft+'px');
								}else if(week_current>week_tiduNum_2 && week_current<week_tiduNum_3){
									var newPro = progressW*(1/((week_tiduNum_length+1)*2));
									var tipsRight = (newPro-newTips)*2;
									var spanRight = progressW*(2/((week_tiduNum_length+1)*2))
									$('.week .reward-tips span').css({
										'position': 'absolute',
										'right': spanRight+'px'
									});
									$('.week .reward-tips span em').css({
											'left': 'auto',
											'right': tipsRight+'px'
										});
									$(".week .reward-progress progress").attr('value', '18.75');
								}else if(week_current>week_tiduNum_3){
									$('.week .reward-tips span').css({
										'position': 'absolute',
										'right': '0'
									});
									var newPro = progressW*(1/((week_tiduNum_length+1)*2));
									var tipsRight = newPro-newTips;
									$('.week .reward-tips span em').css({
											'left': 'auto',
											'right': tipsRight+'px'
										});
									$(".week .reward-progress progress").attr('value', '30');
								}
								$('.week .reward-tips span').show('500');
						}
					}
				}

				//月任务
				if(parseInt(res.data.info.is_new_agency) == 0){
					var monthProgressVal = parseInt(res.data.info.month_task.current_order_count);//周订单数
				}else{
					var monthProgressVal = 0;
				}
				var month_tiduNum_length = parseInt(res.data.info.month_task.rule.length);
				//判断任务数大于3个时
				if(month_tiduNum_length>3){
					var month_task = res.data.info.month_task.rule;
					var new_i = 0;
					for (i in month_task) {
						if (monthProgressVal>=month_task[i].man) {
							new_i = i;
						}
					}
					if(month_tiduNum_length==4){
						switch(parseInt(new_i)) {
							case 0:
								var month_task_arr = month_task.slice(0, 3);
								break;
							case 1:
								var month_task_arr = month_task.slice(0, 3);
								break;
							case 2:
								var month_task_arr = month_task.slice(1, 4);
								break;
							case 3:
								var month_task_arr = month_task.slice(1, 4);
								break;
						}
					}
					if(month_tiduNum_length==5){
						switch(parseInt(new_i)) {
							case 0:
								var month_task_arr = month_task.slice(0, 3);
								break;
							case 1:
								var month_task_arr = month_task.slice(0, 3);
								break;
							case 2:
								var month_task_arr = month_task.slice(1, 4);
								break;
							case 3:
								var month_task_arr = month_task.slice(2, 5);
								break;
							case 4:
								var month_task_arr = month_task.slice(2, 5);
								break;
						}
					}
					if(month_tiduNum_length==6){
						switch(parseInt(new_i)) {
							case 0:
								var month_task_arr = month_task.slice(0, 3);
								break;
							case 1:
								var month_task_arr = month_task.slice(0, 3);
								break;
							case 2:
								var month_task_arr = month_task.slice(1, 4);
								break;
							case 3:
								var month_task_arr = month_task.slice(2, 5);
								break;
							case 4:
								var month_task_arr = month_task.slice(3, 6);
								break;
							case 5:
								var month_task_arr = month_task.slice(3, 6);
								break;
						}
					}
					reward.$set('month_task', month_task_arr);
					var month_length = 3;
				}
				if(month_tiduNum_length == 1){
					var month_tiduNum_1 = parseInt(res.data.info.month_task.rule[0].man);
				}else if(month_tiduNum_length == 2){
					var month_tiduNum_1 = parseInt(res.data.info.month_task.rule[0].man);
					var month_tiduNum_2 = parseInt(res.data.info.month_task.rule[1].man);
				}else if(month_tiduNum_length == 3){
					var month_tiduNum_1 = parseInt(res.data.info.month_task.rule[0].man);
					var month_tiduNum_2 = parseInt(res.data.info.month_task.rule[1].man);
					var month_tiduNum_3 = parseInt(res.data.info.month_task.rule[2].man);
				}else if(month_tiduNum_length > 3){
					var month_tiduNum_1 = parseInt(month_task_arr[0].man);
					var month_tiduNum_2 = parseInt(month_task_arr[1].man);
					var month_tiduNum_3 = parseInt(month_task_arr[2].man);
				}
				var month_interval = setInterval(month_increment,10);//数值动画
				var month_current = 0;//初始
				function month_increment(){//周数值动画主方法
					month_current = month_current + 1;
					if(month_current >= monthProgressVal){//处理数字累加到传给的值时停止
						clearInterval(month_interval);
						month_current = monthProgressVal;
					}
					if(month_tiduNum_length == 1){
						switch(month_current) {
							case 0:
								$('.month .reward-tips').html('<span><em></em>小主，你还没有开始行动哦~</span>');
								$('.month .reward-tips span').show('500');
								$(".month .reward-progress progress").attr('value', '0');
								break;
							case month_tiduNum_1:
								$('.month .reward-progress span:first-child,.month ul li:first-child').addClass('active');
								$('.month .reward-tips').html('<span><em></em>任务完成，腻害！已赚<b>'+res.data.info.month_task.rule[0].jiang+'</b>元！</span>');
								var tipsW = $('.month .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
								var newPro = (progressW-tipsW)*0.5;
								var marEm = tipsW*(1/2)+(tipsW+tipsPadding)*0.08;
								$('.month .reward-tips span em').css('left', marEm+'px');
								var newLeft = newPro-newTips;
								$(".month .reward-progress progress").attr('value', '15');
								$('.month .reward-tips span').css('margin-left', newLeft+'px');
								$('.month .reward-tips span').show('500');
								break;
							default:
								if(month_current>month_tiduNum_1){
									$('.month .reward-tips').html('<span><em></em>小主，好棒哦！任务全部完成了！</span>');
								}else{
									$('.month .reward-tips').html('<span><em></em>你已完成<b>'+month_current+'</b>单，继续努力哦~</span>');
								}
								var tipsW = $('.month .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
								if(0<month_current && month_current<month_tiduNum_1){
									$(".month .reward-progress progress").attr('value', '7.5');
									var newPro = progressW*(1/((month_tiduNum_length+1)*2));
									var newLeft = newPro-newTips;
									$('.month .reward-tips span').css('margin-left', newLeft+'px');
								}else if(month_current>month_tiduNum_1){
									$('.month .reward-tips span').css({
										'position': 'absolute',
										'right': '0'
									});
									var newPro = progressW*(1/((month_tiduNum_length+1)*2));
									var tipsRight = newPro-newTips;
									$('.month .reward-tips span em').css({
											'left': 'auto',
											'right': tipsRight+'px'
										});
									$(".month .reward-progress progress").attr('value', '30');
								}
								$('.month .reward-tips span').show('500');
						}
					}else if(month_tiduNum_length == 2){
						switch(month_current) {
							case 0:
								$('.month .reward-tips').html('<span><em></em>小主，你还没有开始行动哦~</span>');
								$('.month .reward-tips span').show('500');
								$(".month .reward-progress progress").attr('value', '0');
								break;
							case month_tiduNum_1:
								$('.month .reward-progress span:first-child,.month ul li:first-child').addClass('active');
								$('.month .reward-tips').html('<span><em></em>任务完成，腻害！已赚<b>'+res.data.info.month_task.rule[0].jiang+'</b>元！</span>');
								var tipsW = $('.month .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
								var newPro = progressW*(1/(month_tiduNum_length+1));
								var newLeft = newPro-newTips;
								$('.month .reward-tips span').css('margin-left', newLeft+'px');
								$('.month .reward-tips span').show('500');
								$(".month .reward-progress progress").attr('value', '10');
								break;
							case month_tiduNum_2:
								$('.month .reward-progress span:nth-child(2),.month ul li:nth-child(2)').addClass('active');
								$('.month .reward-tips').html('<span><em></em>任务完成，腻害！已赚<b>'+res.data.info.month_task.rule[1].jiang+'</b>元！</span>');
								var tipsW = $('.month .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08 - $(window).width()*0.014;
								if(progressW<900){
									var newPro = progressW*(1/(month_tiduNum_length+1)) - newTips;
									$('.month .reward-tips span').css({
										'position': 'absolute',
										'right': newPro+'px'
									});
									$('.month .reward-tips span em').css({
										'position': 'absolute',
										'left': '92%'
									});
								}else{
									var newPro = progressW*(2/3);
									var newLeft = newPro-newTips;
									$('.month .reward-tips span').css('margin-left', newPro+'px');
								}
								$('.month .reward-tips span').show('500');
								$(".month .reward-progress progress").attr('value', '20');
								break;
							default:
								if(month_current>month_tiduNum_2){
									$('.month .reward-tips').html('<span><em></em>小主，好棒哦！任务全部完成了！</span>');
								}else{
									$('.month .reward-tips').html('<span><em></em>你已完成<b>'+month_current+'</b>单，继续努力哦~</span>');
								}
								var tipsW = $('.month .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
								if(0<month_current && month_current<month_tiduNum_1){
									$(".month .reward-progress progress").attr('value', '5');
									var newPro = progressW*(1/((month_tiduNum_length+1)*2));
									var newLeft = newPro-newTips;
									$('.month .reward-tips span').css('margin-left', newLeft+'px');
								}else if(month_tiduNum_1<month_current && month_current<month_tiduNum_2){
									if(progressW<900){
										var newPro = progressW*(1/(month_tiduNum_length+1));
										var marEm = progressW*(1/((month_tiduNum_length+1)*2))+(tipsW+tipsPadding)*0.08;
										$('.month .reward-tips span em').css('left', marEm+'px');
									}else{
										var newPro = progressW*((month_tiduNum_length+1)/((month_tiduNum_length+1)*2));
									}
									var newLeft = newPro-newTips;
									$(".month .reward-progress progress").attr('value', '15');
									$('.month .reward-tips span').css('margin-left', newLeft+'px');
								}else if(month_current>month_tiduNum_2){
									$('.month .reward-tips span').css({
										'position': 'absolute',
										'right': '0'
									});
									var newPro = progressW*(1/((month_tiduNum_length+1)*2));
									var tipsRight = newPro-newTips;
									$('.month .reward-tips span em').css({
											'left': 'auto',
											'right': tipsRight+'px'
										});
									$(".month .reward-progress progress").attr('value', '30');
								}
								$('.month .reward-tips span').show('500');
						}
					}else if(month_tiduNum_length == 3 || month_length == 3){
						switch(month_current) {
							case 0:
								$('.month .reward-tips').html('<span><em></em>小主，你还没有开始行动哦~</span>');
								$('.month .reward-tips span').show('500');
								$(".month .reward-progress progress").attr('value', '0');
								break;
							case month_tiduNum_1:
								$('.month .reward-progress span:first-child,.month ul li:first-child').addClass('active');
								$('.month .reward-tips').html('<span><em></em>任务完成，腻害！已赚<b>'+res.data.info.month_task.rule[0].jiang+'</b>元！</span>');
								var tipsW = $('.month .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
								var newPro = progressW*(1/(month_tiduNum_length+1));
								var newLeft = newPro-newTips;
								$('.month .reward-tips span').css('margin-left', newLeft+'px');
								$('.month .reward-tips span').show('500');
								$(".month .reward-progress progress").attr('value', '7.5');
								break;
							case month_tiduNum_2:
								$('.month .reward-progress span:nth-child(2),.month ul li:nth-child(2)').addClass('active');
								$('.month .reward-tips').html('<span><em></em>任务完成，腻害！已赚<b>'+res.data.info.month_task.rule[1].jiang+'</b>元！</span>');
								var tipsW = $('.month .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
								var newPro = (progressW-tipsW)*0.5;
								var marEm = tipsW*(1/2)+(tipsW+tipsPadding)*0.08;
								$('.month .reward-tips span em').css('left', marEm+'px');
								var newLeft = newPro-newTips;
								$(".month .reward-progress progress").attr('value', '15');
								$('.month .reward-tips span').css('margin-left', newLeft+'px');
								$('.month .reward-tips span').show('500');
								break;
							case month_tiduNum_3:
								$('.month .reward-progress span:nth-child(3),.month ul li:nth-child(3)').addClass('active');
								$('.month .reward-tips').html('<span><em></em>任务完成，腻害！已赚<b>'+res.data.info.month_task.rule[2].jiang+'</b>元！</span>');
								var tipsW = $('.month .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08 - $(window).width()*0.014;
								if(progressW<900){
									var newPro = progressW*(1/(month_tiduNum_length+1)) - newTips;
									$('.month .reward-tips span').css({
										'position': 'absolute',
										'right': newPro+'px'
									});
									$('.month .reward-tips span em').css({
										'position': 'absolute',
										'left': '88%'
									});
								}else{
									var newPro = progressW*(2/3);
									var newLeft = newPro-newTips;
									$('.month .reward-tips span').css('margin-left', newPro+'px');
								}
								$('.month .reward-tips span').show('500');
								$(".month .reward-progress progress").attr('value', '22.5');
								break;
							default:
								if(month_current>month_tiduNum_3){
									$('.month .reward-tips').html('<span><em></em>小主，好棒哦！任务全部完成了！</span>');
								}else{
									$('.month .reward-tips').html('<span><em></em>你已完成<b>'+month_current+'</b>单，继续努力哦~</span>');
								}
								var tipsW = $('.month .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
								if(0<month_current && month_current<month_tiduNum_1){
									$(".month .reward-progress progress").attr('value', '3.75');
									var newPro = progressW*(1/((month_tiduNum_length+1)*2));
									var newLeft = newPro-newTips;
									$('.month .reward-tips span').css('margin-left', newLeft+'px');
								}else if(month_tiduNum_1<month_current && month_current<month_tiduNum_2){
									if(progressW<900){
										var newPro = progressW*(1/(month_tiduNum_length+1));
										var marEm = progressW*(1/((month_tiduNum_length+1)*2))+(tipsW+tipsPadding)*0.08;
										$('.month .reward-tips span em').css('left', marEm+'px');
									}else{
										var newPro = progressW*((month_tiduNum_length+1)/((month_tiduNum_length+1)*2));
									}
									var newLeft = newPro-newTips;
									$(".month .reward-progress progress").attr('value', '11.25');
									$('.month .reward-tips span').css('margin-left', newLeft+'px');
								}else if(month_current>month_tiduNum_2 && month_current<month_tiduNum_3){
									var newPro = progressW*(1/((month_tiduNum_length+1)*2));
									var tipsRight = (newPro-newTips)*2;
									var spanRight = progressW*(2/((month_tiduNum_length+1)*2))
									$('.month .reward-tips span').css({
										'position': 'absolute',
										'right': spanRight+'px'
									});
									$('.month .reward-tips span em').css({
											'left': 'auto',
											'right': tipsRight+'px'
										});
									$(".month .reward-progress progress").attr('value', '18.75');
								}else if(month_current>month_tiduNum_3){
									$('.month .reward-tips span').css({
										'position': 'absolute',
										'right': '0'
									});
									var newPro = progressW*(1/((month_tiduNum_length+1)*2));
									var tipsRight = newPro-newTips;
									$('.month .reward-tips span em').css({
											'left': 'auto',
											'right': tipsRight+'px'
										});
									$(".month .reward-progress progress").attr('value', '30');
								}
								$('.month .reward-tips span').show('500');
						}
					}
				}

				//新手任务
				var new_progressW = $(window).width() * 0.84;//进度条宽度
				var newProgressVal = parseInt(res.data.info.new_agency_task.current_order_count);//周订单数
				var new_tiduNum_length = parseInt(res.data.info.new_agency_task.rule.length);
				if(new_tiduNum_length == 1){
					var new_tiduNum_1 = parseInt(res.data.info.new_agency_task.rule[0].man);
				}else if(new_tiduNum_length == 2){
					var new_tiduNum_1 = parseInt(res.data.info.new_agency_task.rule[0].man);
					var new_tiduNum_2 = parseInt(res.data.info.new_agency_task.rule[1].man);
				}else if(new_tiduNum_length == 3){
					var new_tiduNum_1 = parseInt(res.data.info.new_agency_task.rule[0].man);
					var new_tiduNum_2 = parseInt(res.data.info.new_agency_task.rule[1].man);
					var new_tiduNum_3 = parseInt(res.data.info.new_agency_task.rule[2].man);
				}else if(new_tiduNum_length == 4){
					var new_tiduNum_1 = parseInt(res.data.info.new_agency_task.rule[0].man);
					var new_tiduNum_2 = parseInt(res.data.info.new_agency_task.rule[1].man);
					var new_tiduNum_3 = parseInt(res.data.info.new_agency_task.rule[2].man);
					var new_tiduNum_4 = parseInt(res.data.info.new_agency_task.rule[3].man);
				}
				var new_interval = setInterval(new_increment,50);//数值动画
				var new_current = 0;//初始
				function new_increment(){//周数值动画主方法
					new_current = new_current + 1;
					if(new_current >= newProgressVal){//处理数字累加到传给的值时停止
						clearInterval(new_interval);
						new_current = newProgressVal;
					}
					if(new_tiduNum_length == 1){
						switch(new_current) {
							case 0:
								$('.new .reward-tips').html('<span><em></em>小主，你还没有开始行动哦~</span>');
								$('.new .reward-tips span').show('500');
								$(".new .reward-progress progress").attr('value', '0');
								break;
							case new_tiduNum_1:
								$('.new .reward-progress span:first-child,.new ul li:first-child').addClass('active');
								$('.new .reward-tips').html('<span><em></em>太棒了！恭喜小主完成小目标！</span>');
								var tipsW = $('.new .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
								var newPro = (new_progressW-tipsW)*0.5;
								var marEm = tipsW*(1/2)+(tipsW+tipsPadding)*0.08;
								$('.new .reward-tips span em').css('left', marEm+'px');
								var newLeft = newPro-newTips;
								$(".new .reward-progress progress").attr('value', '15');
								$('.new .reward-tips span').css('margin-left', newLeft+'px');
								$('.new .reward-tips span').show('500');
								break;
							default:
								if(new_current>new_tiduNum_1){
									$('.new .reward-tips').html('<span><em></em>太棒了！恭喜小主完成小目标！</span>');
								}else{
									$('.new .reward-tips').html('<span><em></em>你已完成<b>'+new_current+'</b>单，继续努力哦~</span>');
								}
								var tipsW = $('.new .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
								if(0<new_current && new_current<new_tiduNum_1){
									$(".new .reward-progress progress").attr('value', '7.5');
									var newPro = new_progressW*(1/((new_tiduNum_length+1)*2));
									var newLeft = newPro-newTips;
									$('.new .reward-tips span').css('margin-left', newLeft+'px');
								}else if(new_current>new_tiduNum_1){
									$('.new .reward-tips span').css({
										'position': 'absolute',
										'right': '0'
									});
									var newPro = new_progressW*(1/((new_tiduNum_length+1)*2));
									var tipsRight = newPro-newTips;
									$('.new .reward-tips span em').css({
											'left': 'auto',
											'right': tipsRight+'px'
										});
									$(".new .reward-progress progress").attr('value', '30');
								}
								$('.new .reward-tips span').show('500');
						}
					}else if(new_tiduNum_length == 2){
						switch(new_current) {
							case 0:
								$('.new .reward-tips').html('<span><em></em>小主，你还没有开始行动哦~</span>');
								$('.new .reward-tips span').show('500');
								$(".new .reward-progress progress").attr('value', '0');
								break;
							case new_tiduNum_1:
								$('.new .reward-progress span:first-child,.new ul li:first-child').addClass('active');
								$('.new .reward-tips').html('<span><em></em>本周达标啦，送你一朵小花！</span>');
								var tipsW = $('.new .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
								var newPro = new_progressW*(1/(new_tiduNum_length+1));
								var newLeft = newPro-newTips;
								$('.new .reward-tips span').css('margin-left', newLeft+'px');
								$('.new .reward-tips span').show('500');
								$(".new .reward-progress progress").attr('value', '10');
								break;
							case (new_tiduNum_1+new_tiduNum_2):
								$('.new .reward-progress span:nth-child(2),.new ul li:nth-child(2)').addClass('active');
								$('.new .reward-tips').html('<span><em></em>太棒了！恭喜小主完成小目标！</span>');
								var tipsW = $('.new .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08 - $(window).width()*0.014;
								if(new_progressW<900){
									var newPro = new_progressW*(1/(new_tiduNum_length+1)) - newTips;
									$('.new .reward-tips span').css({
										'position': 'absolute',
										'right': newPro+'px'
									});
									$('.new .reward-tips span em').css({
										'position': 'absolute',
										'left': '92%'
									});
								}else{
									var newPro = new_progressW*(2/3);
									var newLeft = newPro-newTips;
									$('.new .reward-tips span').css('margin-left', newPro+'px');
								}
								$('.new .reward-tips span').show('500');
								$(".new .reward-progress progress").attr('value', '20');
								break;
							default:
								if(new_current>(new_tiduNum_1+new_tiduNum_2)){
									$('.new .reward-tips').html('<span><em></em>太棒了！恭喜小主完成小目标！</span>');
								}else{
									$('.new .reward-tips').html('<span><em></em>你已完成<b>'+new_current+'</b>单，加油哦~</span>');
								}
								var tipsW = $('.new .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
								if(0<new_current && new_current<new_tiduNum_1){
									$(".new .reward-progress progress").attr('value', '5');
									var newPro = new_progressW*(1/((new_tiduNum_length+1)*2));
									var newLeft = newPro-newTips;
									$('.new .reward-tips span').css('margin-left', newLeft+'px');
								}else if(new_tiduNum_1<new_current && new_current<(new_tiduNum_1+new_tiduNum_2)){
									if(new_progressW<480){
										var newPro = new_progressW*(1/(new_tiduNum_length+1));
										var marEm = new_progressW*(1/((new_tiduNum_length+1)*2))+(tipsW+tipsPadding)*0.08;
										$('.new .reward-tips span em').css('left', marEm+'px');
									}else{
										var newPro = new_progressW*((new_tiduNum_length+1)/((new_tiduNum_length+1)*2));
									}
									var newLeft = newPro-newTips;
									$(".new .reward-progress progress").attr('value', '15');
									$('.new .reward-tips span').css('margin-left', newLeft+'px');
								}else if(new_current>(new_tiduNum_1+new_tiduNum_2)){
									$('.new .reward-tips span').css({
										'position': 'absolute',
										'right': '0'
									});
									var newPro = new_progressW*(1/((new_tiduNum_length+1)*2));
									var tipsRight = newPro-newTips;
									$('.new .reward-tips span em').css({
											'left': 'auto',
											'right': tipsRight+'px'
										});
									$(".new .reward-progress progress").attr('value', '30');
								}
								$('.new .reward-tips span').show('500');
						}
					}else if(new_tiduNum_length == 3){
						switch(new_current) {
							case 0:
								$('.new .reward-tips').html('<span><em></em>小主，你还没有开始行动哦~</span>');
								$('.new .reward-tips span').show('500');
								$(".new .reward-progress progress").attr('value', '0');
								break;
							case new_tiduNum_1:
								$('.new .reward-progress span:first-child,.new ul li:first-child').addClass('active');
								$('.new .reward-tips').html('<span><em></em>本周达标啦，送你一朵小花！</span>');
								var tipsW = $('.new .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
								var newPro = new_progressW*(1/(new_tiduNum_length+1));
								var newLeft = newPro-newTips;
								$('.new .reward-tips span').css('margin-left', newLeft+'px');
								$('.new .reward-tips span').show('500');
								$(".new .reward-progress progress").attr('value', '7.5');
								break;
							case (new_tiduNum_1+new_tiduNum_2):
								$('.new .reward-progress span:nth-child(2),.new ul li:nth-child(2)').addClass('active');
								$('.new .reward-tips').html('<span><em></em>本周达标啦，下周再战！</span>');
								var tipsW = $('.new .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
								var newPro = (new_progressW-tipsW)*0.5;
								var marEm = tipsW*(1/2)+(tipsW+tipsPadding)*0.08;
								$('.new .reward-tips span em').css('left', marEm+'px');
								var newLeft = newPro-newTips;
								$(".new .reward-progress progress").attr('value', '15');
								$('.new .reward-tips span').css('margin-left', newLeft+'px');
								$('.new .reward-tips span').show('500');
								break;
							case (new_tiduNum_1+new_tiduNum_2+new_tiduNum_3):
								$('.new .reward-progress span:nth-child(3),.new ul li:nth-child(3)').addClass('active');
								$('.new .reward-tips').html('<span><em></em>太棒了！恭喜小主完成小目标！</span>');
								var tipsW = $('.new .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08 - $(window).width()*0.014;
								if(new_progressW<900){
									var newPro = new_progressW*(1/(new_tiduNum_length+1)) - newTips;
									$('.new .reward-tips span').css({
										'position': 'absolute',
										'right': newPro+'px'
									});
									$('.new .reward-tips span em').css({
										'position': 'absolute',
										'left': '92%'
									});
								}else{
									var newPro = new_progressW*(2/3);
									var newLeft = newPro-newTips;
									$('.new .reward-tips span').css('margin-left', newPro+'px');
								}
								$('.new .reward-tips span').show('500');
								$(".new .reward-progress progress").attr('value', '22.5');
								break;
							default:
								if(new_current>(new_tiduNum_1+new_tiduNum_2+new_tiduNum_3)){
									$('.new .reward-tips').html('<span><em></em>太棒了！恭喜小主完成小目标！</span>');
								}else{
									$('.new .reward-tips').html('<span><em></em>你已完成<b>'+new_current+'</b>单，加油哦~</span>');
								}
								var tipsW = $('.new .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
								if(0<new_current && new_current<new_tiduNum_1){
									$(".new .reward-progress progress").attr('value', '3.75');
									var newPro = new_progressW*(1/((new_tiduNum_length+1)*2));
									var newLeft = newPro-newTips;
									$('.new .reward-tips span').css('margin-left', newLeft+'px');
								}else if(new_tiduNum_1<new_current && new_current<(new_tiduNum_1+new_tiduNum_2)){
									if(new_progressW<480){
										var newPro = new_progressW*(1/(new_tiduNum_length+1));
										var marEm = new_progressW*(1/((new_tiduNum_length+1)*2))+(tipsW+tipsPadding)*0.08;
										$('.new .reward-tips span em').css('left', marEm+'px');
									}else{
										var newPro = new_progressW*((new_tiduNum_length+1)/((new_tiduNum_length+1)*2));
									}
									var newLeft = newPro-newTips;
									$(".new .reward-progress progress").attr('value', '11.25');
									$('.new .reward-tips span').css('margin-left', newLeft+'px');
								}else if(new_current>(new_tiduNum_1+new_tiduNum_2) && new_current<(new_tiduNum_1+new_tiduNum_2+new_tiduNum_3)){
									var newPro = new_progressW*(1/((new_tiduNum_length+1)*2));
									var tipsRight = (newPro-newTips)*2;
									var spanRight = new_progressW*(2/((new_tiduNum_length+1)*2))
									$('.new .reward-tips span').css({
										'position': 'absolute',
										'right': spanRight+'px'
									});
									$('.new .reward-tips span em').css({
											'left': 'auto',
											'right': tipsRight+'px'
										});
									$(".new .reward-progress progress").attr('value', '18.75');
								}else if(new_current>(new_tiduNum_1+new_tiduNum_2+new_tiduNum_3)){
									$('.new .reward-tips span').css({
										'position': 'absolute',
										'right': '0'
									});
									var newPro = new_progressW*(1/((new_tiduNum_length+1)*2));
									var tipsRight = newPro-newTips;
									$('.new .reward-tips span em').css({
											'left': 'auto',
											'right': tipsRight+'px'
										});
									$(".new .reward-progress progress").attr('value', '30');
								}
								$('.new .reward-tips span').show('500');
						}
					}else if(new_tiduNum_length == 4){
						switch(new_current) {
							case 0:
								$('.new .reward-tips').html('<span><em></em>小主，你还没有开始行动哦~</span>');
								$('.new .reward-tips span').show('500');
								$(".new .reward-progress progress").attr('value', '0');
								break;
							case new_tiduNum_1:
								$('.new .reward-progress span:first-child,.new ul li:first-child').addClass('active');
								$('.new .reward-tips').html('<span><em></em>本周达标啦，送你一朵小花！</span>');
								var tipsW = $('.new .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
								var newPro = new_progressW*(1/(new_tiduNum_length+1));
								var newLeft = newPro-newTips;
								$('.new .reward-tips span').css('margin-left', newLeft+'px');
								$('.new .reward-tips span').show('500');
								$(".new .reward-progress progress").attr('value', '6');
								break;
							case (new_tiduNum_1+new_tiduNum_2):
								$('.new .reward-progress span:nth-child(2),.new ul li:nth-child(2)').addClass('active');
								$('.new .reward-tips').html('<span><em></em>本周达标啦，下周再战！</span>');
								var tipsW = $('.new .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
								var newPro = new_progressW*(2/(new_tiduNum_length+1));
								var newLeft = newPro-newTips;
								$('.new .reward-tips span').css('margin-left', newLeft+'px');
								$(".new .reward-progress progress").attr('value', '12');
								$('.new .reward-tips span').show('500');
								break;
							case (new_tiduNum_1+new_tiduNum_2+new_tiduNum_3):
								$('.new .reward-progress span:nth-child(3),.new ul li:nth-child(3)').addClass('active');
								$('.new .reward-tips').html('<span><em></em>本周达标啦，下周再战！</span>');
								var tipsW = $('.new .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08 - $(window).width()*0.014;
								if(new_progressW<900){
									var newPro = new_progressW*(2/(new_tiduNum_length+1)) - newTips;
									$('.new .reward-tips span').css({
										'position': 'absolute',
										'right': newPro+'px'
									});
									$('.new .reward-tips span em').css({
										'position': 'absolute',
										'left': '92%'
									});
								}else{
									var newPro = new_progressW*(2/3);
									var newLeft = newPro-newTips;
									$('.new .reward-tips span').css('margin-left', newPro+'px');
								}
								$('.new .reward-tips span').show('500');
								$(".new .reward-progress progress").attr('value', '18');
								break;
							case (new_tiduNum_1+new_tiduNum_2+new_tiduNum_3+new_tiduNum_4):
								$('.new .reward-progress span:nth-child(4),.new ul li:nth-child(4),.new .reward-progress span:nth-child(5),.new ul li:nth-child(5)').addClass('active');
								$('.new .reward-tips').html('<span><em></em>太棒了！恭喜小主完成小目标！</span>');
								var tipsW = $('.new .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08 - $(window).width()*0.014;
								var newPro = new_progressW*(1/(new_tiduNum_length+1)) - newTips;
									$('.new .reward-tips span').css({
										'position': 'absolute',
										'right': newPro+'px'
									});
									$('.new .reward-tips span em').css({
										'position': 'absolute',
										'left': '92%'
									});
								$('.new .reward-tips span').show('500');
								$(".new .reward-progress progress").attr('value', '30');
								break;
							default:
								if(new_current>(new_tiduNum_1+new_tiduNum_2+new_tiduNum_3+new_tiduNum_4)){
									$('.new .reward-tips').html('<span><em></em>太棒了！恭喜小主完成小目标！</span>');
								}else{
									$('.new .reward-tips').html('<span><em></em>你已完成<b>'+new_current+'</b>单，加油哦~</span>');
								}
								var tipsW = $('.new .reward-tips span').width();
								var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
								if(0<new_current && new_current<new_tiduNum_1){
									$(".new .reward-progress progress").attr('value', '3');
									var newPro = new_progressW*(1/((new_tiduNum_length+1)*2));
									var newLeft = newPro-newTips;
									$('.new .reward-tips span').css('margin-left', newLeft+'px');
								}else if(new_tiduNum_1<new_current && new_current<(new_tiduNum_1+new_tiduNum_2)){
									$(".new .reward-progress progress").attr('value', '9');
									var newPro = new_progressW*(3/((new_tiduNum_length+1)*2));
									var newLeft = newPro-newTips;
									$('.new .reward-tips span').css('margin-left', newLeft+'px');
								}else if(new_current>(new_tiduNum_1+new_tiduNum_2) && new_current<(new_tiduNum_1+new_tiduNum_2+new_tiduNum_3)){
									var tipsW = $('.new .reward-tips span').width();
									var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
									var newPro = new_progressW*(1/2);
									var newLeft = newPro-newTips;
									$('.new .reward-tips span').css('margin-left', newLeft+'px');
									$(".new .reward-progress progress").attr('value', '15');
								}else if(new_current>(new_tiduNum_1+new_tiduNum_2+new_tiduNum_3) && new_current<(new_tiduNum_1+new_tiduNum_2+new_tiduNum_3+new_tiduNum_4)){
									$('.new .reward-tips span').css({
										'position': 'absolute',
										'right': '0'
									});
									var newPro = new_progressW*(3/((new_tiduNum_length+1)*2));
									var tipsRight = newPro-newTips;
									$('.new .reward-tips span em').css({
											'left': 'auto',
											'right': tipsRight+'px'
										});
									$(".new .reward-progress progress").attr('value', '21');
								}else if(new_current>(new_tiduNum_1+new_tiduNum_2+new_tiduNum_3+new_tiduNum_4)){
									$('.new .reward-tips span').css({
										'position': 'absolute',
										'right': '0'
									});
									var newPro = new_progressW*(1/((new_tiduNum_length+1)*2));
									var tipsRight = newPro-newTips;
									$('.new .reward-tips span em').css({
											'left': 'auto',
											'right': tipsRight+'px'
										});
									$(".new .reward-progress progress").attr('value', '30');
								}
								$('.new .reward-tips span').show('500');
						}
					}
				}
				reward.$set('task_info', res.data.info);
				reward.$set('new_agency_task', res.data.info.new_agency_task);
			}
		})
	}

	var reward = new Vue({
		el: '#user-reward',
		data: {
			info: {},
			week_task: [],
			month_task: [],
			new_agency_task: {},
			task_info: {}
		},
		ready: function() {
			common.globalAjax({
				action: 'Incentive.incentiveIndex',
				done: function(res) {
					//获取数据
					reward.$set('info', res.data.info);
					task();
                    if(common.checkAPP() == 'miyan'){
                        window.location.href = "callApp://articleUrl?url=http://"+window.location.host+"/page/user/weixinText.html?article_id="+res.data.info.explain_id+"￥is_reward_txt=1";
                    }
				},
				fail: function(res){
					//404显示
					var html_404 = '<p class="tipinfo"><img src="/dist/images/indexImg/404_03.jpg" alt="404"><span>无法打开页面~</span></p>';
					$('#user-reward').hide();
					$('body').append(html_404);
					$("html,body").css('height', '100%');
	                $("body").css({
	                    display: 'table',
	                    width: '100%',
	                    background: '#f5f5f5'
	                });
	                $(".tipinfo").css('display', 'table-cell');
				}
			})
		},
		watch: {
			'info': function(){
				this.$nextTick(function () {
					$('.root').show();
				});
			}
		},
		methods: {
			goIndex: function() {
				// if(reward.task_info.is_new_agency == 0){
				// 	window.location.href = 'callApp://goIndex'
				// }else{
				// 	layer.open({
    //                     content: '新代理成长任务结束后才能开启喔~',
    //                     skin: 'msg',
    // 					time: 1.5,
    //                     shadeClose: false
    //                 });
				// }
				window.location.href = 'callApp://goIndex'
			},
			close: function() {
				$('.reward-box,.hideBox').hide();
			},
			subReward: function() {
				common.globalAjax({
					action: 'Incentive.OpenOldAgencyTask',
					data: {},
					done: function(res) {
						$('.reward-box,.hideBox').hide();
						task();
					},
					fail: function(res){
						layer.open({
							content: res.data.msg,
							skin: 'msg',
							time: 1.5
						})
					}
				})
			}
		}
	})

})