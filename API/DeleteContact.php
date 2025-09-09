<?php
	$inData = getRequestInfo();
	
    $contactId = $inData["contactId"];
	$userId = $inData["userId"];

	$conn = new mysqli("localhost", "APIUser", "contactprojectapi2025", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("DELETE FROM Contacts WHERE ID=? AND UserID=?");
		$stmt->bind_param("ii", $contactId, $userId);
		if ($stmt->execute()) {
            returnWithError("");
        } else {
            returnWithError("Error deleting contact: " . $stmt->error);
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
	
?>