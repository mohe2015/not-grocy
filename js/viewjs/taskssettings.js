﻿function taskssettingsView(Grocy, scope = null)
{
	var $scope = $;
	if (scope != null)
	{
		$scope = (selector) => $(scope).find(selector);
	}

	Grocy.Use("numberpicker");

	$scope("#tasks_due_soon_days").val(Grocy.UserSettings.tasks_due_soon_days);

	RefreshLocaleNumberInput();

}


window.taskssettingsView = taskssettingsView