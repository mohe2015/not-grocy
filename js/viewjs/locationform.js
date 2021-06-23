﻿import { WindowMessageBag } from '../helpers/messagebag';

function locationformView(Grocy, scope = null)
{
	var $scope = $;
	if (scope != null)
	{
		$scope = $(scope).find;
	}

	Grocy.Use("userfieldsform");

	$scope('#save-location-button').on('click', function(e)
	{
		e.preventDefault();

		if ($scope(".combobox-menu-visible").length)
		{
			return;
		}

		var jsonData = $scope('#location-form').serializeJSON();
		Grocy.FrontendHelpers.BeginUiBusy("location-form");

		if (Grocy.EditMode === 'create')
		{
			Grocy.Api.Post('objects/locations', jsonData,
				function(result)
				{
					Grocy.EditObjectId = result.created_object_id;
					Grocy.Components.UserfieldsForm.Save(function()
					{
						if (Grocy.GetUriParam("embedded") !== undefined)
						{
							window.parent.postMessage(WindowMessageBag("Reload"), Grocy.BaseUrl);
						}
						else
						{
							window.location.href = U('/locations');
						}
					});
				},
				function(xhr)
				{
					Grocy.FrontendHelpers.EndUiBusy("location-form");
					Grocy.FrontendHelpers.ShowGenericError('Error while saving, probably this item already exists', xhr.response)
				}
			);
		}
		else
		{
			Grocy.Api.Put('objects/locations/' + Grocy.EditObjectId, jsonData,
				function(result)
				{
					Grocy.Components.UserfieldsForm.Save(function()
					{
						if (Grocy.GetUriParam("embedded") !== undefined)
						{
							window.parent.postMessage(WindowMessageBag("Reload"), Grocy.BaseUrl);
						}
						else
						{
							window.location.href = U('/locations');
						}
					});
				},
				function(xhr)
				{
					Grocy.FrontendHelpers.EndUiBusy("location-form");
					Grocy.FrontendHelpers.ShowGenericError('Error while saving, probably this item already exists', xhr.response)
				}
			);
		}
	});

	$scope('#location-form input').keyup(function(event)
	{
		Grocy.FrontendHelpers.ValidateForm('location-form');
	});

	$scope('#location-form input').keydown(function(event)
	{
		if (event.keyCode === 13) //Enter
		{
			event.preventDefault();

			if (document.getElementById('location-form').checkValidity() === false) //There is at least one validation error
			{
				return false;
			}
			else
			{
				$scope('#save-location-button').click();
			}
		}
	});

	Grocy.Components.UserfieldsForm.Load();
	Grocy.FrontendHelpers.ValidateForm('location-form');
	$scope('#name').focus();

}

window.locationformView = locationformView