<?php
	$inData = getRequestInfo();
	
	$firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $phone = $inData["phone"];
    $email = $inData["email"];
    $contactId = $inData["contactId"];
	$userId = $inData["userId"];

	$conn = new mysqli("localhost", "APIUser", "contactprojectapi2025", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Phone=?, Email=? WHERE ID=? AND UserID=?");
		$stmt->bind_param("ssssii", $firstName, $lastName, $phone, $email, $contactId, $userId);
		if ($stmt->execute()) {
            returnWithInfo( $firstName, $lastName, $phone, $email, $contactId, $userId );
        } else {
            returnWithError("Error updating contact: " . $stmt->error);
        }
		$stmt->close();
		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
    function returnWithInfo( $firstName, $lastName, $phone, $email, $id, $userId )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","phone":"'. $phone . '", "email":"'. $email . '","userId":"'. $userId . '", "error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>