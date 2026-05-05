
var html = document.documentElement;
function showInfo() {
					$('#responsive').html(html.clientWidth + 'x' + html.clientHeight);	
					$('#responsive_w').html(html.clientWidth);	
	
					var w_size = html.clientWidth;

					

						if(w_size > 1000){ 
							$(".inorp_l").show("slow"); 
							$(".inorp_m").hide("slow");	
							$(".inorp_s").hide("slow");							
							
							
							$(".rp_table_width").width("90%");

							$(".talbe_with").width("100%");
							$(".inorp_ud_width_msz_main").width("1000");
							$(".inorp_ud_width_msz_body").width("700");

							$(".thum_size_main_shop").width("176");
							$(".thum_size_main_shop").height("auto");
							$(".thum_size_main_shop_td_height").height("110");
							
							$(".thum_size_main_rental").width("224");
							$(".thum_size_main_rental").height("auto");
							$(".thum_size_main_rental_td_height").height("110");	
							
							$(".thum_size_main_rental_175").width("175");
							$(".thum_size_main_rental_175").height("auto");
							$(".thum_size_main_rental_175_td_height").height("110");	

							$(".thum_size_rental").width("150");
							$(".thum_size_rental").height("auto");
							$(".thum_size_rental_td_height").height("110");

							$(".thum_size_main").width("136");
							$(".thum_size_main").height("auto");
							$(".thum_size").width("150");
							$(".thum_size").height("auto");
							
							$(".thum_size_tc").width("200");

							$(".thum_size_td_height").width("30");


							$(".thum_size_pdt_main").width("136");
							$(".thum_size_pdt").width("150"); // pad-note-h 4
							$(".thum_size_pdt").height("auto"); 
							$(".thum_size_pdt_td_height").height("90");

							$(".thum_size_pt").width("204");
						    $(".thum_size_pt_read").width("250");


							$(".rental_rp_width").width("336");
							$(".rental_rp_width").height("auto");

							$(".rental_rp_width_main").width("310");
							$(".rental_rp_width_main").height("auto");

							$(".rental_rp_width_main_375").width("370");
							$(".rental_rp_width_main_375").height("208");

							$(".thum_size_tc").width("200");

							$(".pr_cms_main3_block1").width("350");
							$(".pr_cms_main3_block2").width("350");
							$(".pr_cms_main3_block3").width("350");

							$(".pr_cms_main2_block1").width("550");
							$(".pr_cms_main2_block2").width("550");

						} else if(w_size >= 1000){

							$(".inorp_l").hide("slow");
							$(".inorp_m").show("slow");
     						$(".inorp_s").hide("slow");	
							$("#q_scr").hide("slow");	

							$(".mainrp_l").show("slow");
							$(".mainrp_m").hide("slow");
     						$(".mainrp_s").hide("slow");	


							$(".rp_table_width").width("100%");
							
							$(".talbe_with").width("100%");
							$(".inorp_ud_width_msz_main").width("100%");
							$(".inorp_ud_width_msz_body").width("100%");

							$(".thum_size_main_shop").width("176");
							$(".thum_size_main_shop").height("auto");
							$(".thum_size_main_shop_td_height").height("110");
							
							$(".thum_size_main_rental").width("224");
							$(".thum_size_main_rental").height("auto");
							$(".thum_size_main_rental_td_height").height("110");

							$(".thum_size_main_rental_175").width("175");
							$(".thum_size_main_rental_175").height("auto");
							$(".thum_size_main_rental_175_td_height").height("110");

							$(".thum_size_rental").width("150");
							$(".thum_size_rental").height("auto");
							$(".thum_size_rental_td_height").height("110");


							$(".thum_size_main").width("120");
							$(".thum_size_main").height("auto");
							$(".thum_size").width("120"); // pad-note-h 4
							$(".thum_size").height("auto"); 


							$(".thum_size_pdt_main").width("120");
							$(".thum_size_pdt").width("120"); // pad-note-h 4
							$(".thum_size_pdt").height("auto"); 
							$(".thum_size_pdt_td_height").height("90");

							$(".thum_size_pt").width("204");
							$(".thum_size_pt_read").width("250");

							$(".rental_rp_width").width("336");
							$(".rental_rp_width").height("auto");

							$(".rental_rp_width_main").width("336");
							$(".rental_rp_width_main").height("auto");

							$(".rental_rp_width_main_375").width("370");
							$(".rental_rp_width_main_375").height("auto");


							$(".thum_size_tc").width("200");

							$(".pr_cms_main3_block1").width("350");
							$(".pr_cms_main3_block2").width("350");
							$(".pr_cms_main3_block3").width("350");

							$(".pr_cms_main2_block1").width("550");
							$(".pr_cms_main2_block2").width("550");


						} else if(w_size >=900){

							$(".inorp_l").hide("slow");
							$(".inorp_m").show("slow");
     						$(".inorp_s").hide("slow");	
							$("#q_scr").hide("slow");	

							$(".mainrp_l").hide("slow");
							$(".mainrp_m").show("slow");
     						$(".mainrp_s").hide("slow");	

							$(".rp_table_width").width("100%");
							
							$(".talbe_with").width("100%");
							$(".inorp_ud_width_msz_main").width("100%");
							$(".inorp_ud_width_msz_body").width("100%");

							$(".thum_size_main_shop").width("176");
							$(".thum_size_main_shop").height("auto");
							$(".thum_size_main_shop_td_height").height("110");
							
							$(".thum_size_main_rental").width("150");
							$(".thum_size_main_rental").height("auto");
							$(".thum_size_main_rental_td_height").height("110");

							$(".thum_size_rental").width("150");
							$(".thum_size_rental").height("auto");
							$(".thum_size_rental_td_height").height("110");


							$(".thum_size_pdt_main").width("120");
							$(".thum_size_pdt").width("120"); // pad-note-h 4
							$(".thum_size_pdt").height("auto"); 
							$(".thum_size_pdt_td_height").height("90");

							$(".thum_size_main").width("120");
							$(".thum_size_main").height("auto");
							$(".thum_size").width("120"); // pad-note-h 4
							$(".thum_size").height("auto"); 

							$(".thum_size_pt").width("204");
							$(".thum_size_pt_read").width("100%");

							$(".rental_rp_width").width("336");
							$(".rental_rp_width").height("auto");

							$(".rental_rp_width_main").width("336");
							$(".rental_rp_width_main").height("auto");


							$(".thum_size_tc").width("200");

							$(".pr_cms_main3_block1").width("280");
							$(".pr_cms_main3_block2").width("280");
							$(".pr_cms_main3_block3").width("280");

							$(".pr_cms_main2_block1").width("420");
							$(".pr_cms_main2_block2").width("420");


						} else if(w_size >=720){ /* 아이폰 6s 가로화면 */

							$(".inorp_l").hide("slow");
							$(".inorp_m").show("slow");
     						$(".inorp_s").hide("slow");	
							$("#q_scr").hide("slow");	

							$(".mainrp_l").hide("slow");
							$(".mainrp_m").show("slow");
     						$(".mainrp_s").hide("slow");	
							
							$(".rp_table_width").width("100%");

							$(".talbe_with").width("100%");
							$(".inorp_ud_width_msz_main").width("100%");
							$(".inorp_ud_width_msz_body").width("100%");

							$(".thum_size_main_shop").width("176");
							$(".thum_size_main_shop").height("auto");
							$(".thum_size_main_shop_td_height").height("110");
							
							$(".thum_size_main_rental").width("150");
							$(".thum_size_main_rental").height("auto");
							$(".thum_size_main_rental_td_height").height("110");


							$(".thum_size_rental").width("200");
							$(".thum_size_rental").height("auto");
							$(".thum_size_rental_td_height").height("110");

							$(".thum_size_main").width("200");
							$(".thum_size_main").height("150");
							$(".thum_size").width("200"); // pad-note-h 4
							$(".thum_size").height("auto"); 
							
							$(".thum_size_pt").width("204");
							$(".thum_size_pt_read").width("100%");


							$(".thum_size_pdt_main").width("200");
							$(".thum_size_pdt").width("200"); // pad-note-h 4
							$(".thum_size_pdt").height("auto"); 
							$(".thum_size_pdt_td_height").height("90");

							$(".rental_rp_width").width("330");
							$(".rental_rp_width").height("auto");

							$(".rental_rp_width_main").width("330");
							$(".rental_rp_width_main").height("auto");

							$(".thum_size_tc").width("200");

							$(".pr_cms_main3_block1").width("280");
							$(".pr_cms_main3_block2").width("280");
							$(".pr_cms_main3_block3").width("280");

							$(".pr_cms_main2_block1").width("320");
							$(".pr_cms_main2_block2").width("320");

							
						} else if(w_size >= 640){ /* 노트II 가로화면 */

							$(".inorp_l").hide("slow");
							$(".inorp_m").show("slow");
     						$(".inorp_s").hide("slow");	
							$("#q_scr").hide("slow");	

							$(".mainrp_l").hide("slow");
							$(".mainrp_m").show("slow");
     						$(".mainrp_s").hide("slow");	

							$(".rp_table_width").width("100%");
							
							$(".talbe_with").width("100%");
							$(".inorp_ud_width_msz_main").width("100%");
							$(".inorp_ud_width_msz_body").width("100%");
							

							$(".thum_size_main_shop").width("176");
							$(".thum_size_main_shop").height("auto");
							$(".thum_size_main_shop_td_height").height("110");
					
						$(".thum_size_main_rental").width("124");
						$(".thum_size_main_rental").height("auto");
						$(".thum_size_main_rental_td_height").height("110");

						
						$(".thum_size_rental").width("170");
						$(".thum_size_rental").height("auto");
						$(".thum_size_rental_td_height").height("110");



						$(".thum_size_main").width("180");
						$(".thum_size_main").height("135");
						$(".thum_size").width("120");  // smtp-note-h 4
						$(".thum_size").height("auto");  

						$(".thum_size_pt").width("204");
						$(".thum_size_pt_read").width("100%");


						$(".thum_size_pdt_main").width("180");
						$(".thum_size_pdt").width("120"); // pad-note-h 4
						$(".thum_size_pdt").height("auto"); 
						$(".thum_size_pdt_td_height").height("90");

						$(".rental_rp_width").width("280");
						$(".rental_rp_width").height("auto");


						$(".rental_rp_width_main").width("280");
						$(".rental_rp_width_main").height("auto");

						$(".thum_size_tc").width("200");

						$(".pr_cms_main3_block1").width("280");
						$(".pr_cms_main3_block2").width("280");
						$(".pr_cms_main3_block3").width("280");

						$(".pr_cms_main2_block1").width("280");
						$(".pr_cms_main2_block2").width("280");


						
						} else if(w_size >= 600){

							$(".inorp_l").hide("slow");
							$(".inorp_m").show("slow");
     						$(".inorp_s").hide("slow");	

							$(".mainrp_l").hide("slow");
							$(".mainrp_m").show("slow");
     						$(".mainrp_s").hide("slow");	


							$("#q_scr").hide("slow");	
							
							$(".talbe_with").width("100%");
							$(".inorp_ud_width_msz_main").width("100%");
							$(".inorp_ud_width_msz_body").width("100%");

							$(".thum_size_main_shop").width("176");
							$(".thum_size_main_shop").height("auto");
							$(".thum_size_main_shop_td_height").height("110");
	
							$(".thum_size_main_rental").width("140");
							$(".thum_size_main_rental").height("auto");
							$(".thum_size_main_rental_td_height").height("110");

							$(".thum_size_rental").width("150");
							$(".thum_size_rental").height("auto");
							$(".thum_size_rental_td_height").height("110");

							$(".thum_size_main").width("140");
							$(".thum_size_main").height("auto");
							$(".thum_size").width("110"); //smtp-note-v 2 or pad-note-v 4
							$(".thum_size").height("auto"); 
							$(".thum_size_pt").width("204");
							$(".thum_size_pt_read").width("100%");

							$(".thum_size_pdt_main").width("140");
							$(".thum_size_pdt").width("110"); // pad-note-h 4
							$(".thum_size_pdt").height("auto"); 
							$(".thum_size_pdt_td_height").height("90");

							$(".rental_rp_width").width("280");
							$(".rental_rp_width").height("auto");

							$(".rental_rp_width_main").width("280");
							$(".rental_rp_width_main").height("auto");

							$(".thum_size_tc").width("200");

							$(".pr_cms_main3_block1").width("300");
							$(".pr_cms_main3_block2").width("300");
							$(".pr_cms_main3_block3").width("300");

							$(".pr_cms_main2_block1").width("300");
							$(".pr_cms_main2_block2").width("300");
						
							
						} else if(w_size >= 414){ // 아이폰 6s 세로화면 // 아이폰 6s 414 736 갤럭시 note2 360  640 

							$(".inorp_l").hide("slow");
							$(".inorp_m").hide("slow");
							$(".inorp_s").show("slow");

							$(".mainrp_l").hide("slow");
							$(".mainrp_m").hide("slow");
     						$(".mainrp_s").show("slow");	

							$("#q_scr").hide("slow");	
							
							$(".rp_table_width").width("100%");

							$(".talbe_with").width("100%");
							$(".inorp_ud_width_msz_main").width("100%");
							$(".inorp_ud_width_msz_body").width("100%");

							$(".thum_size_main_shop").width("176");
							$(".thum_size_main_shop").height("auto");
							$(".thum_size_main_shop_td_height").height("110");

						$(".thum_size_main_rental").width("160");
						$(".thum_size_main_rental").height("auto");
						$(".thum_size_main_rental_td_height").height("110");

						$(".thum_size_rental").width("150");
						$(".thum_size_rental").height("auto");
						$(".thum_size_rental_td_height").height("110");

						$(".thum_size_main").width("160");
						$(".thum_size_main").height("auto");
						$(".thum_size").width("150");
						$(".thum_size").height("auto");

						$(".thum_size_pt").width("120");
						$(".thum_size_pt_read").width("100%");


						$(".thum_size_pdt_main").width("160");
						$(".thum_size_pdt").width("150"); // pad-note-h 4
						$(".thum_size_pdt").height("auto"); 
						$(".thum_size_pdt_td_height").height("90");

						$(".rental_rp_width").width("330");
						$(".rental_rp_width").height("auto");

						$(".rental_rp_width_main").width("330");
						$(".rental_rp_width_main").height("auto");


						$(".thum_size_tc").width("100");

						$(".pr_cms_main3_block1").width("350");
						$(".pr_cms_main3_block2").width("350");
						$(".pr_cms_main3_block3").width("350");

						$(".pr_cms_main2_block1").width("350");
						$(".pr_cms_main2_block2").width("350");


						} else if(w_size >= 350){ // 노트II 세로화면 // 아이폰 6s 414 736 갤럭시 note2 360  640 

							$(".inorp_l").hide("slow");
							$(".inorp_m").hide("slow");
							$(".inorp_s").show("slow");

							$(".mainrp_l").hide("slow");
							$(".mainrp_m").hide("slow");
     						$(".mainrp_s").show("slow");	

							$("#q_scr").hide("slow");	

							$(".rp_table_width").width("100%");
							
							$(".talbe_with").width("100%");
							$(".inorp_ud_width_msz_main").width("100%");
							$(".inorp_ud_width_msz_body").width("100%");

							$(".thum_size_main_shop").width("176");
							$(".thum_size_main_shop").height("auto");
							$(".thum_size_main_shop_td_height").height("110");

						$(".thum_size_main_rental").width("130");
						$(".thum_size_main_rental").height("auto");
						$(".thum_size_main_rental_td_height").height("110");

						$(".thum_size_rental").width("120");
						$(".thum_size_rental").height("auto");
						$(".thum_size_rental_td_height").height("110");

						$(".thum_size_main").width("130");
						$(".thum_size_main").height("auto");
						$(".thum_size").width("120");
						$(".thum_size").height("auto");

						$(".thum_size_pt").width("120");
						$(".thum_size_pt_read").width("100%");


						$(".thum_size_pdt_main").width("130");
						$(".thum_size_pdt").width("120"); // pad-note-h 4
						$(".thum_size_pdt").height("auto"); 
						$(".thum_size_pdt_td_height").height("90");

						$(".rental_rp_width").width("300");
						$(".rental_rp_width").height("auto");

						$(".rental_rp_width_main").width("330");
						$(".rental_rp_width_main").height("auto");

						$(".thum_size_tc").width("80");

						$(".pr_cms_main3_block1").width("330");
						$(".pr_cms_main3_block2").width("330");
						$(".pr_cms_main3_block3").width("330");

						$(".pr_cms_main2_block1").width("330");
						$(".pr_cms_main2_block2").width("330");

						} else if(w_size >= 300){ // 아이폰 6s 414 736 갤럭시 note2 360  640 

							$(".inorp_l").hide("slow");
							$(".inorp_m").hide("slow");
							$(".inorp_s").show("slow");

							$(".mainrp_l").hide("slow");
							$(".mainrp_m").hide("slow");
     						$(".mainrp_s").show("slow");	

							$("#q_scr").hide("slow");	

							$(".rp_table_width").width("100%");
							
							$(".talbe_with").width("100%");
							$(".inorp_ud_width_msz_main").width("100%");
							$(".inorp_ud_width_msz_body").width("100%");

							$(".thum_size_main_shop").width("176");
							$(".thum_size_main_shop").height("auto");
							$(".thum_size_main_shop_td_height").height("110");

						$(".thum_size_main_rental").width("120");
						$(".thum_size_main_rental").height("auto");
						$(".thum_size_main_rental_td_height").height("110");

						$(".thum_size_rental").width("120");
						$(".thum_size_rental").height("auto");
						$(".thum_size_rental_td_height").height("110");

						$(".thum_size_main").width("120");
						$(".thum_size_main").height("auto");
						$(".thum_size").width("120");
						$(".thum_size").height("auto");
						$(".thum_size_pt").width("120");
						$(".thum_size_pt_read").width("100%");

						$(".thum_size_pdt_main").width("120");
						$(".thum_size_pdt").width("120"); // pad-note-h 4
						$(".thum_size_pdt").height("auto"); 
						$(".thum_size_pdt_td_height").height("90");

						$(".rental_rp_width").width("300");

						$(".rental_rp_width_main").width("300");
						
						$(".thum_size_tc").width("80");

						$(".pr_cms_main3_block1").width("300");
						$(".pr_cms_main3_block2").width("300");
						$(".pr_cms_main3_block3").width("300");

						$(".pr_cms_main2_block1").width("300");
						$(".pr_cms_main2_block2").width("300");
						
						} else {	
							
							$(".inorp_l").hide("slow");
							$(".inorp_m").hide("slow");
							$(".inorp_s").show("slow");

							$(".mainrp_l").hide("slow");
							$(".mainrp_m").hide("slow");
     						$(".mainrp_s").show("slow");	

							$("#q_scr").hide("slow");	
							
							$(".rp_table_width").width("100%");

							$(".talbe_with").width("100%");	
							$(".inorp_ud_width_msz_main").width("100%");
							$(".inorp_ud_width_msz_body").width("100%");

							$(".thum_size_main_shop").width("176");
							$(".thum_size_main_shop").height("auto");
							$(".thum_size_main_shop_td_height").height("110");

							$(".thum_size_main_rental").width("120");
							$(".thum_size_main_rental").height("auto");
							$(".thum_size_main_rental_td_height").height("110");

							$(".thum_size_rental").width("120");
							$(".thum_size_rental").height("auto");
							$(".thum_size_rental_td_height").height("110");

							$(".thum_size_main").width("120");
							$(".thum_size_main").height("auto");
							$(".thum_size").width("120");
							$(".thum_size_td_height").width("30");
							

							$(".thum_size_pdt_main").width("120");
							$(".thum_size_pdt").width("120"); // pad-note-h 4
							$(".thum_size_pdt").height("auto"); 
							$(".thum_size_pdt_td_height").height("90");	

							$(".thum_size_pt_read").width("204");
	
							$(".rental_rp_width").width("100%");

							$(".rental_rp_width_main").width("100%");
							
							$(".thum_size_tc").width("80");

							$(".pr_cms_main3_block1").width("300");
							$(".pr_cms_main3_block2").width("300");
							$(".pr_cms_main3_block3").width("300");

							$(".pr_cms_main2_block1").width("300");
							$(".pr_cms_main2_block2").width("300");

						}
								
							
					
								if(w_size < 800){ 
									$("#top_menu_bg").hide("slow");	
									$(".main_slide_bg_text_size").height("50");	
									$('.body_img').css('width' , $(window).width() - 50 );
								} else {
									$(".main_slide_bg_text_size").height("400");	
									$("#top_menu_bg").show("slow");	
								}


					}
$(function() {
	showInfo();
	$(window).bind('resize', showInfo);
});

/*	$(function() {
        $('.img_wp a').lightBox();
    });
*/

//$(".body_img").click(function(){ //클릭했을떄
//   $(".inorp_l").hide("slow");
//   $(".inorp_m").hide("slow");
//   $(".inorp_s").hide("slow");
 /*  $("div").css("visibility", "visible"); //아까 div를 숨긴것을 보이게 함
   $("#divImg").attr("src", $(this).attr("src")); //div의 img소스의 src를 클릭한 그림의 src로 바꿈*/
//})