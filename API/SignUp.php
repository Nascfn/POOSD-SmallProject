<?php

	$inData = getRequestInfo();
	
    $firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $login = $inData["login"];
    $password = $inData["password"];


	$conn = new mysqli("localhost", "APIUser", "contactprojectapi2025", "COP4331"); 	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
        $stmtCheck = $conn->prepare("SELECT ID FROM Users WHERE Login=?");
        $stmtCheck->bind_param("s", $login );
		$stmtCheck->execute();
		$resultCheck = $stmtCheck->get_result();

        if( $row = $resultCheck->fetch_assoc()  )
		{
            returnWithError("Login Already Exits");		
        }
        else {
            $stmt = $conn->prepare("INSERT INTO Users (FirstName,LastName,Login,Password) VALUES(?,?,?,?)");
            $stmt->bind_param("ssss", $firstName, $lastName, $login, $password );
            $stmt->execute();
            $result = $stmt->get_result();
            returnWithInfo( $firstName, $lastName, $login,mysqli_insert_id($conn) );
            $stmt->close();
        }
    
        $stmtCheck->close();
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
		$retValue = '{"id":0,"firstName":"","lastName":"","login":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $firstName, $lastName, $login, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","login":"'. $login . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
