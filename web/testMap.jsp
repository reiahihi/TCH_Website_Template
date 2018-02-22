<%--
// ****************************************** ************************************
// **************************    ************ User: MiTom
// *****************************    ********* Phone: 0966 941 840
// ********************************    ****** Email: 
// ****************************************** ************************************
// *****       ********       ******    ***** Package: 
// *****        ******        ******    ***** Project: TCH_Website_Template
// *****    *    ****    *    ******    ***** Date: 22-Feb-18
// *****    **    **    **    ******    ***** Time: 14:13
// *****    ***        ***    ******    ***** Name: testMap
// *****    **************    ******    ***** ************************************
// *****    **************    ******    ***** Created by IntelliJ IDEA.
// ****************************************** ************************************
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <style>
        /* Always set the map height explicitly to define the size of the div
         * element that contains the map. */
        #map {
            height: 100%;
        }
        /* Optional: Makes the sample page fill the window. */
        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
        }
    </style>
</head>
<body>

<div id="map"></div>

<script src="assets/js/maps.js">
</script>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAN6qFzPCIzC_V8MTnbY2WrvKPs7rK0CkY&callback=myMap"></script>

</body>
</html>
