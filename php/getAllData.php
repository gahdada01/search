
<?php

	include "connectDB.php";

	$sql = "SELECT `staff_tb`.id AS staff_id, `staff_tb`.name, `staff-post_tb`.id AS staff_post_id, `staff-post_tb`.post, `post_mst`.name AS post_name, `staff-part_tb`.id AS staff_part_id, `staff-part_tb`.part, `part_mst`.name AS part_name
		FROM `staff_tb`
		INNER JOIN `staff-post_tb` ON `staff_tb`.id = `staff-post_tb`.staff 
		INNER JOIN `staff-part_tb` ON `staff_tb`.id = `staff-part_tb`.staff
		INNER JOIN `post_mst` ON `staff-post_tb`.post = `post_mst`.id
		INNER JOIN `part_mst` ON `staff-part_tb`.part = `part_mst`.id
		ORDER BY `staff_tb`.id  ASC;";


	$result = $conn->query($sql);
	$all_data = [];
	if ($result->num_rows > 0) {
	    // output data of each row
	    while($row = $result->fetch_assoc()) {
	    	$data = array(
	    		"id" => $row['staff_id'],
	    		"name" => $row['name'],
	    		"staff_post_id" => $row['staff_post_id'],
	    		"post" => $row['post'],
	    		"post_name" => $row['post_name'],
	    		"staff_part_id" => $row['staff_part_id'],
	    		"part" => $row['part'],
	    		"part_name" => $row['part_name'],
			  );
	    	$all_data[] = $data;
    	}
	    
    }
	echo json_encode(array_values($all_data));

	$conn->close();


?>