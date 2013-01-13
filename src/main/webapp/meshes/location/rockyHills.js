{
	"metadata": {
		"formatVersion" : 3.2,
		"type"		: "scene",
		"generatedBy"	: "convert-to-threejs.py",
		"objects"       : 1,
		"geometries"    : 1,
		"materials"     : 1,
		"textures"      : 1
	},

	"urlBaseType": "relativeToScene",

	"objects" :
	{
		"plains" : {
			"geometry" : "Geometry_33_plains",
			"material" : "lambert2",
			"position" : [ 0, 0, 0 ],
			"rotation" : [ 0, -0, 0 ],
			"scale"	   : [ 1, 1, 1 ],
			"visible"  : true
		}
	},

	"geometries" :
	{
		"Geometry_33_plains" : {
			"type"  : "embedded",
			"id" : "Embed_33_plains"
		}
	},

	"materials" :
	{
		"lambert2": {
			"type"    : "MeshLambertMaterial",
			"parameters"  : {
				"color"  : 16777215,
				"ambient"  : 0,
				"emissive"  : 0,
				"reflectivity"  : 1,
				"transparent" : false,
				"opacity" : 1.0,
				"map": "Texture_35_plains",
				"wireframe" : false,
				"wireframeLinewidth" : 1
			}
		}
	},

	"textures" :
	{
		"Texture_35_plains": {
			"url"    : "rockyHills.png",
			"repeat" : [ 1, 1 ],
			"offset" : [ 0, 0 ],
			"magFilter" : "LinearFilter",
			"minFilter" : "LinearMipMapLinearFilter",
			"anisotropy" : true
		}
	},

	"embeds" :
	{
		"Embed_33_plains" : {
			"metadata"  : {
				"vertices" : 121,
				"normals" : 121,
				"colors" : 0,
				"faces" : 100,
				"uvs" : [ 121 ]
			},
			"boundingBox"  : {
				"min" : [ -0.5,-0.5,-0.0332954376936 ],
				"max" : [ 0.5,0.5,0.102418132126 ]
			},
			"scale" : 1,
			"materials" : [  ],
			"vertices" : [ -0.5,-0.5,0,-0.4,-0.5,0,-0.3,-0.5,0,-0.2,-0.5,0,-0.1,-0.5,0,0,-0.5,0,0.1,-0.5,0,0.2,-0.5,0,0.3,-0.5,0,0.4,-0.5,0,0.5,-0.5,0,-0.5,-0.4,-7.88861e-30,-0.4,-0.4,-0.00832423,-0.3,-0.4,-0.0166485,-0.2,-0.4,-0.0166485,-0.1,-0.4,-0.00832423,0,-0.4,-7.88861e-30,0.0970377,-0.396227,0.00689521,0.194075,-0.392453,0.0137904,0.294075,-0.392453,0.0137904,0.397038,-0.396227,0.00689521,0.5,-0.4,-7.88861e-30,-0.5,-0.3,-1.57772e-29,-0.4,-0.3,-0.0166477,-0.3,-0.3,-0.0332954,-0.2,-0.3,-0.0332954,-0.1,-0.3,-0.0166477,0,-0.3,-1.57772e-29,0.0940756,-0.292454,0.0137898,0.188151,-0.284907,0.0275796,0.288151,-0.284907,0.0275796,0.394076,-0.292454,0.0137898,0.5,-0.3,-1.57772e-29,-0.5,-0.2,-1.19808e-29,-0.4,-0.2,-0.016647,-0.3,-0.2,-0.033294,-0.199342,-0.199646,-0.030314,-0.0980263,-0.198938,-0.00770708,0.00328951,-0.19823,0.0148998,0.0960495,-0.191392,0.0227291,0.188809,-0.184554,0.0305583,0.288152,-0.184908,0.0275784,0.394076,-0.192454,0.0137892,0.5,-0.2,-1.19808e-29,-0.5,-0.1,7.88861e-30,-0.4,-0.1,-0.00832312,-0.3,-0.1,-0.0166462,-0.198026,-0.0989379,-0.00770674,-0.0940791,-0.0968136,0.0184954,0.00986809,-0.0946894,0.0446975,0.102959,-0.0930408,0.0337128,0.19605,-0.0913923,0.0227281,0.294076,-0.0924544,0.0137886,0.397038,-0.0962272,0.00689429,0.5,-0.1,7.88861e-30,-0.5,0,0,-0.4,0,0,-0.3,0,0,-0.196711,0.00177013,0.0148985,-0.0901323,0.0053104,0.0446955,0.0164461,0.00885067,0.0744926,0.109868,0.0053104,0.0446955,0.203289,0.00177013,0.0148985,0.3,0,0,0.4,0,0,0.5,0,0,-0.5,0.1,3.15514e-29,-0.4,0.1,0.00925187,-0.3,0.1,0.0185037,-0.19963,0.104695,0.0342398,-0.098889,0.114086,0.0564601,0.00185168,0.123477,0.0786804,0.101111,0.114086,0.0686703,0.20037,0.104695,0.0586603,0.3,0.1,0.0429242,0.4,0.1,0.0214621,0.5,0.1,3.15514e-29,-0.5,0.2,-1.57772e-29,-0.4,0.2,0.0185029,-0.3,0.2,0.0370058,-0.202548,0.20762,0.0535794,-0.107645,0.222861,0.0682236,-0.0127414,0.238102,0.0828678,0.0923552,0.222861,0.092643,0.197452,0.20762,0.102418,0.3,0.2,0.0858446,0.4,0.2,0.0429223,0.5,0.2,-1.57772e-29,-0.5,0.3,1.57772e-29,-0.4,0.3,0.0185021,-0.3,0.3,0.0370042,-0.203206,0.307266,0.0505977,-0.109618,0.321798,0.0592826,-0.0160296,0.336331,0.0679676,0.0903822,0.321798,0.0837009,0.196794,0.307266,0.0994343,0.3,0.3,0.0858408,0.4,0.3,0.0429204,0.5,0.3,1.57772e-29,-0.5,0.4,-6.37005e-29,-0.4,0.4,0.00925063,-0.3,0.4,0.0185013,-0.201603,0.403633,0.0252977,-0.104809,0.410899,0.02964,-0.00801446,0.418164,0.0339823,0.0951914,0.410899,0.0418486,0.198397,0.403633,0.0497149,0.3,0.4,0.0429185,0.4,0.4,0.0214592,0.5,0.4,-6.37005e-29,-0.5,0.5,0,-0.4,0.5,0,-0.3,0.5,0,-0.2,0.5,0,-0.1,0.5,0,0,0.5,0,0.1,0.5,0,0.2,0.5,0,0.3,0.5,0,0.4,0.5,0,0.5,0.5,0 ],
			"normals" : [ 0.041549,0.041549,0.998272,0.041443,0.082743,0.995709,0.020641,0.144071,0.989352,-0.020641,0.144071,0.989352,-0.041443,0.082743,0.995709,-0.03795,0.003629,0.999273,-0.033622,-0.066553,0.997216,-0.016461,-0.11299,0.99346,0.01601,-0.11164,0.99362,0.03268,-0.064709,0.997369,0.033316,-0.033316,0.998889,0.082741,0.041441,0.995709,0.082531,0.082529,0.993165,0.041116,0.144007,0.988722,-0.041116,0.144007,0.988722,-0.082531,0.082529,0.993165,-0.076393,0.003344,0.997072,-0.068534,-0.067408,0.995369,-0.033543,-0.113665,0.992953,0.031309,-0.110973,0.99333,0.063863,-0.063741,0.995921,0.065071,-0.0328,0.997341,0.144063,0.020638,0.989353,0.144006,0.04111,0.988722,0.068497,0.068488,0.995298,-0.082779,0.054604,0.995071,-0.1576,-0.000265,0.987503,-0.131526,-0.054398,0.989819,-0.105705,-0.076771,0.99143,-0.04928,-0.075311,0.995942,0.059452,-0.058965,0.996488,0.112114,-0.031365,0.9932,0.112957,-0.016129,0.993469,0.144059,-0.020642,0.989354,0.144002,-0.041119,0.988723,0.054411,-0.082884,0.995073,-0.122126,-0.122028,0.984985,-0.206796,-0.158924,0.96539,-0.123474,-0.168172,0.977994,-0.043309,-0.097436,0.994299,-0.004267,0.005342,0.999977,0.077272,0.050107,0.99575,0.11562,0.034286,0.992701,0.114712,0.016719,0.993258,0.082734,-0.041439,0.99571,0.082524,-0.082525,0.993166,-0.000694,-0.157748,0.987479,-0.159214,-0.206869,0.965327,-0.233043,-0.233105,0.944115,-0.058931,-0.227905,0.971898,0.11693,-0.115025,0.986457,0.104023,0.042181,0.99368,0.080635,0.107135,0.990969,0.06862,0.069783,0.995199,0.067459,0.034017,0.997142,-0.002311,-0.043895,0.999034,-0.002287,-0.087368,0.996174,-0.064111,-0.159112,0.985177,-0.182311,-0.187432,0.965211,-0.239578,-0.178246,0.954374,-0.020136,-0.166109,0.985902,0.198411,-0.158993,0.967137,0.163381,-0.154426,0.974402,0.100099,-0.123245,0.987315,0.07044,-0.06819,0.995183,0.070554,-0.035875,0.996863,-0.091833,-0.046013,0.994711,-0.091546,-0.091544,0.991584,-0.117587,-0.160267,0.980045,-0.171067,-0.16838,0.970765,-0.201806,-0.122166,0.971777,-0.058313,-0.104253,0.99284,0.080682,-0.208794,0.974626,0.098136,-0.344981,0.933465,0.162287,-0.344937,0.92449,0.203416,-0.203411,0.95773,0.20654,-0.104393,0.972853,-0.159707,-0.022894,0.986899,-0.159629,-0.045562,0.986125,-0.15558,-0.076609,0.984848,-0.1503,-0.066287,0.986416,-0.153338,-0.016998,0.988028,-0.108493,0.004337,0.994088,-0.067027,-0.065477,0.9956,0.031081,-0.159408,0.986723,0.244512,-0.170377,0.954561,0.349618,-0.099476,0.931597,0.350473,-0.050923,0.935188,-0.159702,0.022899,0.9869,-0.159624,0.045573,0.986125,-0.147148,0.092311,0.984797,-0.125189,0.144676,0.981528,-0.119321,0.204705,0.971524,-0.102721,0.251078,0.962501,-0.083543,0.260926,0.961737,0.02367,0.241618,0.970083,0.242151,0.187345,0.951979,0.349607,0.099498,0.931598,0.350462,0.050934,0.935191,-0.091825,0.046011,0.994712,-0.091538,0.09154,0.991585,-0.083329,0.177435,0.980598,-0.070191,0.25174,0.965246,-0.066912,0.319215,0.945317,-0.054696,0.380345,0.923226,-0.03859,0.425657,0.904061,0.019224,0.434891,0.900278,0.137105,0.364217,0.921167,0.203399,0.203403,0.957735,0.206523,0.104388,0.972857,-0.046155,0.046155,0.997867,-0.046009,0.091823,0.994712,-0.041617,0.177717,0.983201,-0.034549,0.251508,0.967238,-0.032649,0.318049,0.947512,-0.02722,0.37896,0.925013,-0.019836,0.425011,0.904971,0.009654,0.434799,0.900476,0.070059,0.366395,0.927818,0.104384,0.206519,0.972859,0.106082,0.106082,0.988683 ],
			"colors" : [  ],
			"uvs" : [ [0,0,0.1,0,0.2,0,0.3,0,0.4,0,0.5,0,0.6,0,0.7,0,0.8,0,0.9,0,1,0,0,0.1,0.1,0.1,0.2,0.1,0.3,0.1,0.4,0.1,0.5,0.1,0.6,0.1,0.7,0.1,0.8,0.1,0.9,0.1,1,0.1,0,0.2,0.1,0.2,0.2,0.2,0.3,0.2,0.4,0.2,0.5,0.2,0.6,0.2,0.7,0.2,0.8,0.2,0.9,0.2,1,0.2,0,0.3,0.1,0.3,0.2,0.3,0.3,0.3,0.4,0.3,0.5,0.3,0.6,0.3,0.7,0.3,0.8,0.3,0.9,0.3,1,0.3,0,0.4,0.1,0.4,0.2,0.4,0.3,0.4,0.4,0.4,0.5,0.4,0.6,0.4,0.7,0.4,0.8,0.4,0.9,0.4,1,0.4,0,0.5,0.1,0.5,0.2,0.5,0.3,0.5,0.4,0.5,0.5,0.5,0.6,0.5,0.7,0.5,0.8,0.5,0.9,0.5,1,0.5,0,0.6,0.1,0.6,0.2,0.6,0.3,0.6,0.4,0.6,0.5,0.6,0.6,0.6,0.7,0.6,0.8,0.6,0.9,0.6,1,0.6,0,0.7,0.1,0.7,0.2,0.7,0.3,0.7,0.4,0.7,0.5,0.7,0.6,0.7,0.7,0.7,0.8,0.7,0.9,0.7,1,0.7,0,0.8,0.1,0.8,0.2,0.8,0.3,0.8,0.4,0.8,0.5,0.8,0.6,0.8,0.7,0.8,0.8,0.8,0.9,0.8,1,0.8,0,0.9,0.1,0.9,0.2,0.9,0.3,0.9,0.4,0.9,0.5,0.9,0.6,0.9,0.7,0.9,0.8,0.9,0.9,0.9,1,0.9,0,1,0.1,1,0.2,1,0.3,1,0.4,1,0.5,1,0.6,1,0.7,1,0.8,1,0.9,1,1,1] ],
			"faces" : [ 43,0,1,12,11,0,0,1,12,11,0,1,12,11,43,1,2,13,12,0,1,2,13,12,1,2,13,12,43,2,3,14,13,0,2,3,14,13,2,3,14,13,43,3,4,15,14,0,3,4,15,14,3,4,15,14,43,4,5,16,15,0,4,5,16,15,4,5,16,15,43,5,6,17,16,0,5,6,17,16,5,6,17,16,43,6,7,18,17,0,6,7,18,17,6,7,18,17,43,7,8,19,18,0,7,8,19,18,7,8,19,18,43,8,9,20,19,0,8,9,20,19,8,9,20,19,43,9,10,21,20,0,9,10,21,20,9,10,21,20,43,11,12,23,22,0,11,12,23,22,11,12,23,22,43,12,13,24,23,0,12,13,24,23,12,13,24,23,43,13,14,25,24,0,13,14,25,24,13,14,25,24,43,14,15,26,25,0,14,15,26,25,14,15,26,25,43,15,16,27,26,0,15,16,27,26,15,16,27,26,43,16,17,28,27,0,16,17,28,27,16,17,28,27,43,17,18,29,28,0,17,18,29,28,17,18,29,28,43,18,19,30,29,0,18,19,30,29,18,19,30,29,43,19,20,31,30,0,19,20,31,30,19,20,31,30,43,20,21,32,31,0,20,21,32,31,20,21,32,31,43,22,23,34,33,0,22,23,34,33,22,23,34,33,43,23,24,35,34,0,23,24,35,34,23,24,35,34,43,24,25,36,35,0,24,25,36,35,24,25,36,35,43,25,26,37,36,0,25,26,37,36,25,26,37,36,43,26,27,38,37,0,26,27,38,37,26,27,38,37,43,27,28,39,38,0,27,28,39,38,27,28,39,38,43,28,29,40,39,0,28,29,40,39,28,29,40,39,43,29,30,41,40,0,29,30,41,40,29,30,41,40,43,30,31,42,41,0,30,31,42,41,30,31,42,41,43,31,32,43,42,0,31,32,43,42,31,32,43,42,43,33,34,45,44,0,33,34,45,44,33,34,45,44,43,34,35,46,45,0,34,35,46,45,34,35,46,45,43,35,36,47,46,0,35,36,47,46,35,36,47,46,43,36,37,48,47,0,36,37,48,47,36,37,48,47,43,37,38,49,48,0,37,38,49,48,37,38,49,48,43,38,39,50,49,0,38,39,50,49,38,39,50,49,43,39,40,51,50,0,39,40,51,50,39,40,51,50,43,40,41,52,51,0,40,41,52,51,40,41,52,51,43,41,42,53,52,0,41,42,53,52,41,42,53,52,43,42,43,54,53,0,42,43,54,53,42,43,54,53,43,44,45,56,55,0,44,45,56,55,44,45,56,55,43,45,46,57,56,0,45,46,57,56,45,46,57,56,43,46,47,58,57,0,46,47,58,57,46,47,58,57,43,47,48,59,58,0,47,48,59,58,47,48,59,58,43,48,49,60,59,0,48,49,60,59,48,49,60,59,43,49,50,61,60,0,49,50,61,60,49,50,61,60,43,50,51,62,61,0,50,51,62,61,50,51,62,61,43,51,52,63,62,0,51,52,63,62,51,52,63,62,43,52,53,64,63,0,52,53,64,63,52,53,64,63,43,53,54,65,64,0,53,54,65,64,53,54,65,64,43,55,56,67,66,0,55,56,67,66,55,56,67,66,43,56,57,68,67,0,56,57,68,67,56,57,68,67,43,57,58,69,68,0,57,58,69,68,57,58,69,68,43,58,59,70,69,0,58,59,70,69,58,59,70,69,43,59,60,71,70,0,59,60,71,70,59,60,71,70,43,60,61,72,71,0,60,61,72,71,60,61,72,71,43,61,62,73,72,0,61,62,73,72,61,62,73,72,43,62,63,74,73,0,62,63,74,73,62,63,74,73,43,63,64,75,74,0,63,64,75,74,63,64,75,74,43,64,65,76,75,0,64,65,76,75,64,65,76,75,43,66,67,78,77,0,66,67,78,77,66,67,78,77,43,67,68,79,78,0,67,68,79,78,67,68,79,78,43,68,69,80,79,0,68,69,80,79,68,69,80,79,43,69,70,81,80,0,69,70,81,80,69,70,81,80,43,70,71,82,81,0,70,71,82,81,70,71,82,81,43,71,72,83,82,0,71,72,83,82,71,72,83,82,43,72,73,84,83,0,72,73,84,83,72,73,84,83,43,73,74,85,84,0,73,74,85,84,73,74,85,84,43,74,75,86,85,0,74,75,86,85,74,75,86,85,43,75,76,87,86,0,75,76,87,86,75,76,87,86,43,77,78,89,88,0,77,78,89,88,77,78,89,88,43,78,79,90,89,0,78,79,90,89,78,79,90,89,43,79,80,91,90,0,79,80,91,90,79,80,91,90,43,80,81,92,91,0,80,81,92,91,80,81,92,91,43,81,82,93,92,0,81,82,93,92,81,82,93,92,43,82,83,94,93,0,82,83,94,93,82,83,94,93,43,83,84,95,94,0,83,84,95,94,83,84,95,94,43,84,85,96,95,0,84,85,96,95,84,85,96,95,43,85,86,97,96,0,85,86,97,96,85,86,97,96,43,86,87,98,97,0,86,87,98,97,86,87,98,97,43,88,89,100,99,0,88,89,100,99,88,89,100,99,43,89,90,101,100,0,89,90,101,100,89,90,101,100,43,90,91,102,101,0,90,91,102,101,90,91,102,101,43,91,92,103,102,0,91,92,103,102,91,92,103,102,43,92,93,104,103,0,92,93,104,103,92,93,104,103,43,93,94,105,104,0,93,94,105,104,93,94,105,104,43,94,95,106,105,0,94,95,106,105,94,95,106,105,43,95,96,107,106,0,95,96,107,106,95,96,107,106,43,96,97,108,107,0,96,97,108,107,96,97,108,107,43,97,98,109,108,0,97,98,109,108,97,98,109,108,43,99,100,111,110,0,99,100,111,110,99,100,111,110,43,100,101,112,111,0,100,101,112,111,100,101,112,111,43,101,102,113,112,0,101,102,113,112,101,102,113,112,43,102,103,114,113,0,102,103,114,113,102,103,114,113,43,103,104,115,114,0,103,104,115,114,103,104,115,114,43,104,105,116,115,0,104,105,116,115,104,105,116,115,43,105,106,117,116,0,105,106,117,116,105,106,117,116,43,106,107,118,117,0,106,107,118,117,106,107,118,117,43,107,108,119,118,0,107,108,119,118,107,108,119,118,43,108,109,120,119,0,108,109,120,119,108,109,120,119 ]
		}
	},

	"fogs" :
	{
	
	},

	"transform" :
	{
		"position"  : [ 0, 0, 0 ],
		"rotation"  : [ 0, 0, 0 ],
		"scale"     : [ 1, 1, 1 ]
	},

	"defaults" :
	{
		"bgcolor" : [ 0.667, 0.667, 0.667 ],
		"bgalpha" : 1,
		"camera"  : "",
		"fog"  	  : ""
	}
}