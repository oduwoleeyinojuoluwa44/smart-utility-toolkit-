import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  NativeTouchEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { theme } from '../../../shared/theme';
import { Note, NoteStatus } from '../types';

type NoteEditorProps = {
  visible: boolean;
  initialNote?: Note | null;
  onClose: () => void;
  onSave: (payload: { title: string; content: string; status?: NoteStatus; isPinned?: boolean }, noteId?: string) => Promise<boolean>;
};

export function NoteEditor({ visible, initialNote, onClose, onSave }: NoteEditorProps) {
  const screenWidth = Dimensions.get('window').width;
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<NoteStatus>('active');
  const [isPinned, setIsPinned] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  useEffect(() => {
    if (visible) {
      setTitle(initialNote?.title ?? '');
      setContent(initialNote?.content ?? '');
      setStatus(initialNote?.status ?? 'active');
      setIsPinned(initialNote?.isPinned ?? false);
      setShowValidation(false);
    }
  }, [initialNote, visible]);

  const handleSave = async (saveStatus: NoteStatus = 'active') => {
    const didSave = await onSave({ title, content, status: saveStatus, isPinned }, initialNote?.id);
    if (!didSave) {
      setShowValidation(true);
      return;
    }
    onClose();
  };

  const handleTouchStart = (event: NativeTouchEvent) => {
    touchStartX.current = event.pageX;
    touchStartY.current = event.pageY;
  };

  const handleTouchEnd = (event: NativeTouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      return;
    }

    const endX = event.pageX;
    const endY = event.pageY;
    const dx = endX - touchStartX.current;
    const dy = endY - touchStartY.current;
    const mostlyHorizontal = Math.abs(dx) > 70 && Math.abs(dy) < 35;
    const leftEdgeSwipeRight = touchStartX.current < 40 && dx > 70;
    const rightEdgeSwipeLeft = touchStartX.current > screenWidth - 40 && dx < -70;

    if (mostlyHorizontal && (leftEdgeSwipeRight || rightEdgeSwipeLeft)) {
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        onTouchStart={(e) => handleTouchStart(e.nativeEvent)}
        onTouchEnd={(e) => handleTouchEnd(e.nativeEvent)}
      >
        <View style={styles.header}>
          <Pressable onPress={onClose} hitSlop={16} style={styles.backButton}>
            <Ionicons name="arrow-back" size={22} color="#0F172A" />
          </Pressable>
          <Text style={styles.headerTitle}>{initialNote ? 'Edit Note' : 'New Note'}</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.subHeader}>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
          </Text>
          <Pressable style={styles.pinToggle} onPress={() => setIsPinned((prev) => !prev)} hitSlop={8}>
            <Ionicons name={isPinned ? 'pin' : 'pin-outline'} size={16} color="#334155" />
            <Text style={styles.pinText}>{isPinned ? 'Pinned' : 'Pin'}</Text>
          </Pressable>
        </View>

        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          placeholderTextColor="#94A3B8"
          value={title}
          onChangeText={setTitle}
          returnKeyType="next"
        />

        <TextInput
          style={styles.bodyInput}
          placeholder="Start writing..."
          placeholderTextColor="#94A3B8"
          value={content}
          onChangeText={setContent}
          multiline
          autoFocus
          textAlignVertical="top"
        />

        {showValidation ? <Text style={styles.validation}>Enter a title or content before saving.</Text> : null}

        <View style={styles.footer}>
          <Pressable style={styles.footerBtn} onPress={() => handleSave('draft')}>
            <Ionicons name="document-text-outline" size={16} color="#334155" />
            <Text style={styles.footerBtnText}>Draft</Text>
          </Pressable>
          <Pressable style={styles.footerBtn} onPress={() => handleSave(status === 'archived' ? 'active' : 'archived')}>
            <Ionicons name={status === 'archived' ? 'archive-outline' : 'archive'} size={16} color="#334155" />
            <Text style={styles.footerBtnText}>{status === 'archived' ? 'Unarchive' : 'Archive'}</Text>
          </Pressable>
          <Pressable style={styles.footerBtn} onPress={() => handleSave(status === 'archived' ? 'archived' : 'active')}>
            <Ionicons name="checkmark-done-outline" size={16} color="#334155" />
            <Text style={styles.footerBtnText}>Done</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 8,
  },
  backButton: {
    marginTop: 10,
    padding: 6,
  },
  headerSpacer: {
    width: 22,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  pinToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  pinText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
  },
  titleInput: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F7',
  },
  bodyInput: {
    flex: 1,
    fontSize: 17,
    lineHeight: 24,
    color: '#0F172A',
    paddingTop: 14,
  },
  validation: {
    color: theme.colors.danger,
    fontSize: 12,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 14,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEF2F7',
  },
  footerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  footerBtnText: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '600',
  },
});
