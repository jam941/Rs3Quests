import ReadLvlReqs
import ReadQuestReqs
import json
questReqs = ReadQuestReqs.getQuestReqs()
lvlReqs = ReadLvlReqs.getLvlDic()
for i in lvlReqs.keys():
    lvlReqs[i]["Quests"] = questReqs[i]
print(lvlReqs["Plague's End"])
file_path = "quests.json"
with open(file_path, "w") as json_file:
    json.dump(lvlReqs, json_file)

