coordinates = """
40.7056193	-73.7948417
40.703933	-73.7990619
40.7134746	-73.780396
40.7056193	-73.7948417
40.703933	-73.7990619
40.7134746	-73.780396
40.749587	-73.86207
40.7478876	-73.8694954
40.790584950000000	-73.94769325916920
40.78893105	-73.94334650330520
40.8100904	-73.9505762
40.80652255	-73.94324279755670
40.84937221052630	-73.93644431578950
40.8513511	-73.9324548
40.8094265	-73.922423
40.8066188	-73.9173997
40.8094768	-73.92308918251780
40.817032500000000	-73.91655622428060
40.8152006	-73.9182084
40.815699	-73.916771
40.819759150000000	-73.91362179961330
40.8123875	-73.905737
40.8430601	-73.8860797
40.856021	-73.888254
40.859037	-73.8986013
40.833499	-73.8516245
40.8545792	-73.8669634
40.824374080106300	-73.89269490365730
40.82105641176470	-73.89120076470590
40.8530711	-73.9050279
40.8503716	-73.9160239
40.8543702	-73.9024381
40.82760596428570	-73.92438953571430
40.8094265	-73.922423
40.8066188	-73.9173997
40.8094768	-73.92308918251780
40.8430601	-73.8860797
40.8286821	-73.8798283
40.8294	-73.874658
40.83332398979590	-73.86147191836730
40.6916923	-73.9875662
40.6900727	-73.984223
40.655467	-73.888064	
40.6707349	-73.9306675
40.6675616	-73.9310874
40.65142045	-73.93156786454410
40.6509562	-73.9491098
40.65517	-73.959927
40.655467	-73.888064
40.6998359	-73.93993393710530
40.63316981818180	-73.94760972727270
40.6695435	-73.9109047
40.6693575	-73.9138078
40.6645805625	-73.92260718750000
40.678697	-73.8683185
40.6747715	-73.8757145
40.6830428	-73.8739337
40.64589675	-73.90301975
45.058083	-93.317175
40.63539055	-74.13545615366240
40.624055	-74.148908
40.91586832828540	-74.17317899509560
40.917424	-74.172407
40.918779826087000	-74.17287708695650
40.731603486427200	-74.0676370244009
40.7265763	-74.06777280613930
40.72552990909090	-74.07754163636360
40.74455625	-74.05045825000000
40.720479000000000	-74.081543
40.7184202	-74.0751436
40.734505481481500	-74.17289159259260
40.659027	-74.203255
40.66321005882350	-74.21483070588240
40.66731444444440	-74.21515727777780
40.67929957142860	-74.20147164285710
40.66358042857140	-74.233665
40.2201502244898	-74.76513359183670
39.94612402040820	-75.08953234693880
40.666195700000000	-74.11646660000000
40.61877155102040	-74.42382130612250
40.616101	-74.418686
40.6231135	-74.4315882
39.425830562500000	-75.234689375
39.46119452244070	-75.20775936827800
40.04896710710140	-74.87777756981280
39.36139206357230	-74.43026117793450
39.350700653061200	-74.45618726530610
40.8781624	-74.044933
40.8937275	-74.0433848
40.51938776923080	-74.27561903846150
40.51988782608700	-74.26392469565220
40.5104101	-74.2744682
40.50901925	-74.269851
40.861901764705900	-74.12725417647060
40.865087375	-74.12606925
40.877232	-74.084053
39.39228591304350	-74.52190039130440
39.40657	-74.521219
40.77268931486500	-74.23060568137100
40.209341	-74.085202
40.775881	-74.02617114285710
40.76840834693880	-74.03212348979590
40.72489408571430	-74.2388218
40.72639715595020	-74.22842814689200
40.729339	-74.215329
39.96466357304710	-74.20112194110720
39.48607716326530	-75.02528357142860
39.474964250297300	-75.04407913906770
39.43308546464650	-75.04069169191920
40.792661	-74.197392
39.81167871428570	-74.983931
"""

# Process the data
lines = coordinates.strip().split("\n")
combined = [line.replace("\t", ",") for line in lines]

# Print or save the result
for item in combined:
    print(item)
