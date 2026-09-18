import zipfile, os, json, shutil

# Create properly packaged project files for both direct copy into .sketchware/mysc/list and .sketchware/data/
# And a clean standard backup .swb that Sketchware Pro can read

project_info = {
  "sc_id": "610",
  "my_ws_name": "PubgUcRewards",
  "my_app_name": "شدات ببجي مجاناً",
  "my_pkg_name": "com.lootplay.rewards",
  "sc_ver_code": "1",
  "sc_ver_name": "1.0",
  "color_primary": "-16744320",
  "color_primary_dark": "-16755648",
  "color_accent": "-16711936",
  "color_control_normal": "-5723992",
  "color_control_highlight": "536870912",
  "custom_icon": False
}

file_list = [
  {
    "fileName": "main",
    "activityName": "MainActivity",
    "fileType": 0,
    "keyboardSetting": 0,
    "orientation": 1,
    "title": "شدات ببجي",
    "statusBar": True,
    "toolbar": False,
    "drawer": False,
    "fab": False
  },
  {
    "fileName": "referral",
    "activityName": "ReferralActivity",
    "fileType": 0,
    "keyboardSetting": 0,
    "orientation": 1,
    "title": "دعوة الأصدقاء",
    "statusBar": True,
    "toolbar": True,
    "drawer": False,
    "fab": False
  },
  {
    "fileName": "pubg_shop",
    "activityName": "PubgShopActivity",
    "fileType": 0,
    "keyboardSetting": 0,
    "orientation": 1,
    "title": "متجر الشدات",
    "statusBar": True,
    "toolbar": True,
    "drawer": False,
    "fab": False
  }
]

logic_info = {
  "main": {},
  "referral": {},
  "pubg_shop": {}
}

library_info = {
  "firebase": {
    "useFirebase": True,
    "apiKey": "AIzaSyDummyKeyForPubgRewards123",
    "appId": "1:643150272430:android:pubguc",
    "projectId": "pubg-rewards",
    "storageBucket": "pubg-rewards.appspot.com"
  },
  "admob": {
    "useAdmob": False
  },
  "appCompact": {
    "useAppCompact": True
  }
}

view_info = {
  "main": [
    {
      "id": "linear1",
      "type": "LinearLayout",
      "orientation": 1,
      "width": -1,
      "height": -1,
      "background": "#020617",
      "gravity": 17
    },
    {
      "id": "text_title",
      "type": "TextView",
      "text": "شدات ببجي مجاناً",
      "textSize": 24,
      "textColor": "#F59E0B",
      "textStyle": "bold"
    },
    {
      "id": "btn_start",
      "type": "Button",
      "text": "دخول للتطبيق",
      "textSize": 16,
      "textColor": "#020617",
      "background": "#10B981"
    }
  ]
}

# Write out clean .swb
os.makedirs('temp_swb', exist_ok=True)
with open('temp_swb/project', 'w', encoding='utf-8') as f:
    json.dump(project_info, f)
with open('temp_swb/file', 'w', encoding='utf-8') as f:
    json.dump(file_list, f)
with open('temp_swb/logic', 'w', encoding='utf-8') as f:
    json.dump(logic_info, f)
with open('temp_swb/library', 'w', encoding='utf-8') as f:
    json.dump(library_info, f)
with open('temp_swb/view', 'w', encoding='utf-8') as f:
    json.dump(view_info, f)

with zipfile.ZipFile('public/PubgRewards_v1.0.swb', 'w', zipfile.ZIP_DEFLATED) as z:
    for item in ['project', 'file', 'logic', 'library', 'view']:
        z.write(f'temp_swb/{item}', item)

# Also create a direct copy zip for .sketchware internal folder:
# .sketchware/mysc/list/610/project
# .sketchware/data/610/file, logic, view, library
os.makedirs('temp_direct/mysc/list/610', exist_ok=True)
os.makedirs('temp_direct/data/610', exist_ok=True)

with open('temp_direct/mysc/list/610/project', 'w', encoding='utf-8') as f:
    json.dump(project_info, f)
with open('temp_direct/data/610/file', 'w', encoding='utf-8') as f:
    json.dump(file_list, f)
with open('temp_direct/data/610/logic', 'w', encoding='utf-8') as f:
    json.dump(logic_info, f)
with open('temp_direct/data/610/library', 'w', encoding='utf-8') as f:
    json.dump(library_info, f)
with open('temp_direct/data/610/view', 'w', encoding='utf-8') as f:
    json.dump(view_info, f)

with zipfile.ZipFile('public/Sketchware_Data_Direct_Copy.zip', 'w', zipfile.ZIP_DEFLATED) as z:
    for root, dirs, files in os.walk('temp_direct'):
        for file in files:
            full_p = os.path.join(root, file)
            arc_p = os.path.relpath(full_p, 'temp_direct')
            z.write(full_p, arc_p)

print("Created PubgRewards_v1.0.swb and Sketchware_Data_Direct_Copy.zip successfully!")
