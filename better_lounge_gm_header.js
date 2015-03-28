// ==UserScript==
// @name           Better Lounge
// @description    Improves usability in the Lounge at baseballthinkfactory.org
// @include        http://www.baseballthinkfactory.org/files/forums/viewthread/*
// @include        http://www.baseballthinkfactory.org/forums/viewthread/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==

$(document).ready(main);

function main()
{
	createSettingsPage();
	cleanUpLinks();
	fixQuoteLinksJQ();
	collapsibleZiggies();
	collapseZiggies(GM_getValue("autoCollapseLevel",0));
	buildFormattingButtons();
}

function createSettingsPage()
{	
	$('#footer').append('<div id="loungePrefs"></div>');
	$('#loungePrefs').append('<div id="loungePrefsToggleDiv"><a id="loungePrefsToggle"></a></div><div id="loungePrefsContainer"><div id="loungePrefsHeader"></div><div id="loungePrefsBody"></div></div>');
	
	// initially show the toggle div, not the body div
	$('#loungePrefsToggleDiv').show();
	$('#loungePrefsContainer').hide();
	
	// build the container
	$('#loungePrefsContainer')
		.css(
			{
				'text-align': 'center',
				'margin': '0 auto',
				'width': '450px'
			}
		);
	
	
	// build content for the header
	$('#loungePrefsHeader')
		.css(
			{
				'border': '1px solid rgb(167, 169, 199)'
			}
		)
		.addClass('tableRowHeading')
		.append('<b>Lounge Preferences</b>');
		
	// build content for the body
	$('#loungePrefsBody')
		.css(
			{
				'border': '1px solid rgb(167, 169, 199)',
				'border-top': 'none',
				'text-align': 'center'
			}
		)
		.addClass('tableCellOne')
		.append('<table align="center"><tr><td class="settingsLabel">Ziggurat level to auto-collapse:</td><td width="50px"><input type="text" id="autoCollapseLevel" style="width:100%;"/></td></tr><tr><td class="settingsLabel">Refresh page after saving?</td><td><input type="checkbox" id="refreshAfterSave" style="width:100%;"/></td></tr></table>')
		.append('<table align="center"><tr><td><div class="button150"><div id="loungePrefsSave" class="buttonLarge" onmouseover="navHover(this);" onmouseout="navReset(this);">Save</div></div></td><td><div class="button150"><div id="loungePrefsCancel" class="buttonLarge" onmouseover="navHover(this);" onmouseout="navReset(this);">Cancel</div></div></td></tr></table>');
	$('.settingsLabel').css(
		{
			'text-align': 'left',
			'padding-left': '6px'
		}
		);
	$('.loungePrefsButtonTable').css('margin','0 auto');
	
	// configure link click event
	$('#loungePrefsToggle').text('Edit Lounge Preferences')
		.attr('href','#')
		.attr('title','Click to edit your Lounge preferences')
		.click(
			function(e)
			{
				e.preventDefault();
				$('#autoCollapseLevel').val(GM_getValue("autoCollapseLevel"),"");
				if(GM_getValue("refreshAfterSave",false))
				{
					$('#refreshAfterSave').attr('checked',true); 
				}
				$('#loungePrefsToggleDiv').hide();
				$('#loungePrefsContainer').show();	
				scrollTo(0,99999999999);
			}
		);
	
	// configure save button click event
	$('#loungePrefsSave').click(
		function(e)
		{
			e.preventDefault();
			var autoCollapseLevel = parseInt($('#autoCollapseLevel').val(),10);
			if(isFinite(autoCollapseLevel))
			{
				GM_setValue("autoCollapseLevel",autoCollapseLevel);
			}
			else
			{
				GM_setValue("autoCollapseLevel",0);
			}
			if($('#refreshAfterSave').attr('checked'))
			{
				GM_setValue("refreshAfterSave",true);
				location.reload();
			}
			else
			{
				GM_setValue("refreshAfterSave",false);
			}
			$('#loungePrefsToggleDiv').show();
			$('#loungePrefsContainer').hide();
		}
	);
	
	// configure cancel button click event
	$('#loungePrefsCancel').click(
		function(e)
		{
			e.preventDefault();
			$('#loungePrefsToggleDiv').show();
			$('#loungePrefsContainer').hide();
		}
	);
}

